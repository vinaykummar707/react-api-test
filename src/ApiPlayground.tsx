import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const API_URL = "/api/bitmap";

const fontWeights = ["ExtraLight", "Light", "Regular", "Medium", "Bold"];
const scripts = [
  "english",
  "hindi",
  "marathi",
  "sanskrit",
  "konkani",
  "bengali",
  "assamese",
  "telugu",
  "tamil",
  "punjabi",
  "kannada",
  "gujarati",
  "malayalam",
  "odia",
  "urdu",
];

export const ApiPlayground: React.FC = () => {
  const [params, setParams] = useState({
    text: "",
    height: 16,
    weight: "Regular",
    script: "english",
    stroke: 1,
    spacing: 0,
    width: "",
    verbose: "no",
  });

  // Bitmap dimension calculation helpers
  function getBitmapDimensions(
    bitmap: string | null,
  ): { width: number; height: number } | null {
    if (!bitmap || typeof bitmap !== "string") return null;
    const lines = bitmap.split("\n").filter(Boolean);
    if (!lines.length) return null;
    return { width: lines[0].length, height: lines.length };
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const buildQuery = () => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) query.append(key, value);
    });
    return query.toString();
  };

  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ["bitmap", params],
    queryFn: async () => {
      const res = await fetch(`${API_URL}?${buildQuery()}`);
      if (!res.ok) throw new Error("API error");
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      } else {
        return await res.text();
      }
    },
    enabled: false,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-4 px-2">
      <div className="max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-2 tracking-tight flex items-center gap-2">
          
          Bitmap API Playground
        </h2>
        <p className="text-gray-500 mb-6">
          Test and visualize your LED bitmap API with instant feedback.
        </p>
        <form
          className="grid grid-cols-6 gap-2 mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
          }}
        >
          <div className="col-span-5">
            <label className="block font-semibold text-gray-700 mb-1">
              Text <span className="text-pink-600">*</span>
            </label>
            <input
              name="text"
              value={params.text}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              required
              placeholder="Enter text to render..."
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Height
            </label>
            <input
              name="height"
              type="number"
              min={6}
              max={32}
              step={2}
              value={params.height}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Weight
            </label>
            <select
              name="weight"
              value={params.weight}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            >
              {fontWeights.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Script
            </label>
            <select
              name="script"
              value={params.script}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            >
              {scripts.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Stroke
            </label>
            <input
              name="stroke"
              type="number"
              min={1}
              max={3}
              value={params.stroke}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Spacing
            </label>
            <input
              name="spacing"
              type="number"
              min={0}
              max={4}
              value={params.spacing}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Width
            </label>
            <input
              name="width"
              type="number"
              min={0}
              value={params.width}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="auto"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Verbose
            </label>
            <select
              name="verbose"
              value={params.verbose}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="true">True</option>
              <option value="1">1</option>
            </select>
          </div>
          <div className="md:col-span-6 mt-4 flex justify-start items-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-60"
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Send Request"}
            </button>
          </div>
        </form>
        <div className="mt-8">
          {error && (
            <div className="text-red-600 font-semibold mb-4">
              {(error as Error).message}
            </div>
          )}
          {data && (
            <div className="rounded-xl bg-gray-900 p-6 shadow-inner relative overflow-x-auto">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  {(() => {
                    const dim = getBitmapDimensions(
                      typeof data === "string" ? data : null,
                    );
                    return dim ? `Width: ${dim.width}` : "";
                  })()}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  {(() => {
                    const dim = getBitmapDimensions(
                      typeof data === "string" ? data : null,
                    );
                    return dim ? `Height: ${dim.height}` : "";
                  })()}
                </span>
              </div>
              <pre className="text-green-400 text-xs md:text-sm font-mono whitespace-pre leading-tight">
                {typeof data === "string"
                  ? data
                  : JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
