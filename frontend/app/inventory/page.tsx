"use client";

import { ChangeEvent, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { ArrowUpRight, FileSpreadsheet, Leaf, Upload, X } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";
import { inventory } from "@/lib/demo-data";

type PantryWorkbook = {
  fileName: string;
  sheetName: string;
  uploadedAt: string;
  rows: string[][];
};

const PANTRY_WORKBOOK_KEY = "dineai-pantry-workbook";
const MAX_ROWS = 200;
const MAX_COLUMNS = 30;

function readStoredWorkbook(): PantryWorkbook | null {
  try {
    const saved = window.localStorage.getItem(PANTRY_WORKBOOK_KEY);
    return saved ? (JSON.parse(saved) as PantryWorkbook) : null;
  } catch {
    return null;
  }
}

export default function InventoryPage() {
  const [workbook, setWorkbook] = useState<PantryWorkbook | null>(null);
  const [isViewingWorkbook, setIsViewingWorkbook] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setWorkbook(readStoredWorkbook());
  }, []);

  const uploadWorkbook = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const hasSpreadsheetExtension = /\.(xls|xlsx)$/i.test(file.name);
    if (!hasSpreadsheetExtension) {
      toast.error("Upload an Excel .xls or .xlsx pantry file.");
      return;
    }

    setIsUploading(true);
    try {
      const workbookData = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const sheetName = workbookData.SheetNames[0];
      if (!sheetName) throw new Error("No worksheet found");

      const sheet = workbookData.Sheets[sheetName];
      const rows = XLSX.utils
        .sheet_to_json<unknown[]>(sheet, { header: 1, defval: "", raw: false })
        .slice(0, MAX_ROWS)
        .map((row) => row.slice(0, MAX_COLUMNS).map((cell) => String(cell)));

      if (rows.length === 0) throw new Error("The worksheet is empty");

      const uploadedWorkbook = {
        fileName: file.name,
        sheetName,
        uploadedAt: new Date().toISOString(),
        rows,
      };
      window.localStorage.setItem(PANTRY_WORKBOOK_KEY, JSON.stringify(uploadedWorkbook));
      setWorkbook(uploadedWorkbook);
      toast.success(`${file.name} is ready for the pantry team.`);
    } catch {
      toast.error("We could not read that workbook. Please check the file and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <WorkspaceLayout page="inventory">
      <section className="pantry-upload-bar">
        <div>
          <span><FileSpreadsheet size={18} /></span>
          <div>
            <p>PANTRY WORKBOOK</p>
            <b>{workbook ? workbook.fileName : "No pantry spreadsheet uploaded"}</b>
            <small>
              {workbook
                ? `${workbook.sheetName} · ${workbook.rows.length} rows available to the team`
                : "Upload an .xls or .xlsx file to give the team a shared pantry reference."}
            </small>
          </div>
        </div>
        <label className={isUploading ? "upload-pantry disabled" : "upload-pantry"}>
          <Upload size={16} /> {isUploading ? "Reading file…" : "Upload Excel"}
          <input type="file" accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={uploadWorkbook} disabled={isUploading} />
        </label>
      </section>

      <section className="pantry-map">
        <div className="ingredient-axis">
          {inventory.map((item) => (
            <article key={item.name}>
              <span>{item.name.charAt(0)}</span>
              <div>
                <b>{item.name}</b>
                <small>{item.remaining} {item.unit} remaining</small>
              </div>
              <div className="supply-line">
                <i style={{ width: `${item.percent}%` }} />
              </div>
              <em className={item.state.toLowerCase()}>{item.state}</em>
              <button
                type="button"
                onClick={() => setIsViewingWorkbook(true)}
                aria-label={`View uploaded pantry workbook for ${item.name}`}
                title="View uploaded pantry workbook"
              >
                <ArrowUpRight size={16} />
              </button>
            </article>
          ))}
        </div>
        <aside>
          <Leaf size={26} />
          <p>LIVE IMPACT</p>
          <h2>Ingredient changes ripple through menu and orders automatically.</h2>
          <span>Chicken is low → 3 menu items watched → 1 active order monitored</span>
        </aside>
      </section>

      {isViewingWorkbook && (
        <div className="pantry-workbook-backdrop" role="presentation" onMouseDown={() => setIsViewingWorkbook(false)}>
          <section className="pantry-workbook-modal" role="dialog" aria-modal="true" aria-labelledby="pantry-workbook-title" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div>
                <p>UPLOADED PANTRY WORKBOOK</p>
                <h2 id="pantry-workbook-title">{workbook ? workbook.fileName : "No spreadsheet uploaded"}</h2>
                {workbook && <small>{workbook.sheetName} · Showing up to {MAX_ROWS} rows</small>}
              </div>
              <button type="button" onClick={() => setIsViewingWorkbook(false)} aria-label="Close pantry workbook"><X size={19} /></button>
            </header>
            {workbook ? (
              <div className="pantry-sheet-table" tabIndex={0}>
                <table>
                  <tbody>
                    {workbook.rows.map((row, rowIndex) => (
                      <tr key={`${rowIndex}-${row.join("-")}`}>
                        {row.map((cell, cellIndex) => rowIndex === 0 ? <th key={`${rowIndex}-${cellIndex}`}>{cell || "—"}</th> : <td key={`${rowIndex}-${cellIndex}`}>{cell || "—"}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="pantry-workbook-empty"><FileSpreadsheet size={25} /><h3>Upload the pantry sheet first</h3><p>Choose an .xls or .xlsx file above, then use any pantry arrow to view it here.</p></div>
            )}
          </section>
        </div>
      )}
    </WorkspaceLayout>
  );
}
