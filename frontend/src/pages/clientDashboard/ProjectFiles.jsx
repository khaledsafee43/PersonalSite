import { useMemo, useRef, useState } from "react";
import {
  Search,
  Upload,
  FileText,
  FileImage,
  FileArchive,
  File,
  Download,
  Trash2,
  FolderOpen,
  Grid2X2,
  List,
  MoreVertical,
  X,
  HardDrive,
  CalendarDays,
  Eye,
} from "lucide-react";

const initialFiles = [
  {
    id: 1,
    name: "Project Requirements.pdf",
    category: "Documents",
    size: 2450000,
    date: "2026-10-20",
    project: "E-commerce Website",
    type: "pdf",
  },
  {
    id: 2,
    name: "Homepage Design.png",
    category: "Images",
    size: 1850000,
    date: "2026-10-21",
    project: "Personal Portfolio",
    type: "image",
  },
  {
    id: 3,
    name: "Brand Assets.zip",
    category: "Archives",
    size: 5200000,
    date: "2026-10-19",
    project: "Personal Portfolio",
    type: "zip",
  },
  {
    id: 4,
    name: "API Documentation.pdf",
    category: "Documents",
    size: 950000,
    date: "2026-10-18",
    project: "Management System",
    type: "pdf",
  },
  {
    id: 5,
    name: "Dashboard Preview.jpg",
    category: "Images",
    size: 1200000,
    date: "2026-10-17",
    project: "Management System",
    type: "image",
  },
  {
    id: 6,
    name: "Meeting Notes.docx",
    category: "Documents",
    size: 420000,
    date: "2026-10-16",
    project: "E-commerce Website",
    type: "doc",
  },
];

const categories = ["All Files", "Documents", "Images", "Archives"];

function formatSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileIcon(type) {
  if (type === "image") return FileImage;
  if (type === "zip") return FileArchive;
  if (type === "pdf" || type === "doc") return FileText;
  return File;
}

function getFileColor(type) {
  if (type === "image") return "bg-purple-50 text-purple-600";
  if (type === "zip") return "bg-orange-50 text-orange-600";
  if (type === "pdf") return "bg-red-50 text-red-600";
  return "bg-blue-50 text-blue-600";
}

export default function ProjectFiles() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState(() => {
    try {
      const saved = localStorage.getItem("clientPortalFiles");
      return saved ? JSON.parse(saved) : initialFiles;
    } catch {
      return initialFiles;
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Files");
  const [view, setView] = useState("grid");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  function saveFiles(nextFiles) {
    setFiles(nextFiles);

    localStorage.setItem(
      "clientPortalFiles",
      JSON.stringify(nextFiles)
    );
  }

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesCategory =
        category === "All Files" || file.category === category;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        file.name.toLowerCase().includes(query) ||
        file.project.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [files, category, search]);

  function handleUpload(event) {
    const selected = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024;

    const validFiles = selected.filter(
      (file) => file.size <= maxSize
    );

    if (validFiles.length !== selected.length) {
      alert("Each file must be 10 MB or smaller.");
    }

    if (!validFiles.length) {
      event.target.value = "";
      return;
    }

    setUploading(true);

    const newFiles = validFiles.map((file) => {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "";

      let type = "file";
      let fileCategory = "Documents";

      if (file.type.startsWith("image/")) {
        type = "image";
        fileCategory = "Images";
      } else if (["zip", "rar", "7z"].includes(extension)) {
        type = "zip";
        fileCategory = "Archives";
      } else if (extension === "pdf") {
        type = "pdf";
      } else if (["doc", "docx"].includes(extension)) {
        type = "doc";
      }

      return {
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        category: fileCategory,
        size: file.size,
        date: new Date().toISOString().slice(0, 10),
        project: "Unassigned",
        type,
      };
    });

    const updatedFiles = [...newFiles, ...files];
    saveFiles(updatedFiles);

    setUploading(false);
    event.target.value = "";
  }

  function deleteFile(id) {
    const confirmed = window.confirm(
      "Remove this file from the list?"
    );

    if (!confirmed) return;

    saveFiles(files.filter((file) => file.id !== id));

    setSelectedFiles((previous) =>
      previous.filter((selectedId) => selectedId !== id)
    );
  }

  function downloadFile(file) {
    // Existing sample records have no actual file data.
    const actualFile = file.originalFile;

    if (!actualFile) {
      alert(
        "This is a sample record. Download becomes available after connecting file storage."
      );
      return;
    }

    const url = URL.createObjectURL(actualFile);
    const link = document.createElement("a");

    link.href = url;
    link.download = file.name;
    link.click();

    URL.revokeObjectURL(url);
  }

  function toggleSelected(id) {
    setSelectedFiles((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  const totalSize = files.reduce(
    (total, file) => total + file.size,
    0
  );

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 pb-8">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs text-slate-400">
            Workspace / Files & Documents
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Files & Documents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and organize your project files in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Upload size={17} />
          Upload Files
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.zip,.rar,.7z"
          className="hidden"
          onChange={handleUpload}
        />
      </header>

      {/* Storage Overview */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FolderOpen size={22} />
            </div>

            <span className="text-xs text-slate-400">
              All projects
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-800">
            {files.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Total files
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <HardDrive size={22} />
            </div>

            <span className="text-xs text-slate-400">
              Current files
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-800">
            {formatSize(totalSize)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Listed file sizes
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Upload size={22} />
            </div>

            <span className="text-xs text-slate-400">
              Per file
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-800">
            10 MB
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Maximum upload size
          </p>
        </div>
      </section>

      {/* Main Files */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search files..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    category === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="ml-auto flex rounded-lg border border-slate-200 p-1">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setView("grid")}
                className={`rounded-md p-2 ${
                  view === "grid"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-400"
                }`}
              >
                <Grid2X2 size={16} />
              </button>

              <button
                type="button"
                aria-label="List view"
                onClick={() => setView("list")}
                className={`rounded-md p-2 ${
                  view === "list"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-400"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Selection Toolbar */}
        {selectedFiles.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-blue-100 bg-blue-50 px-5 py-3">
            <p className="text-xs font-semibold text-blue-700">
              {selectedFiles.length} files selected
            </p>

            <button
              type="button"
              onClick={() => {
                const confirmed = window.confirm(
                  `Remove ${selectedFiles.length} selected files from the list?`
                );

                if (!confirmed) return;

                saveFiles(
                  files.filter(
                    (file) => !selectedFiles.includes(file.id)
                  )
                );

                setSelectedFiles([]);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              <Trash2 size={14} />
              Remove selected
            </button>
          </div>
        )}

        {/* File Grid/List */}
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 sm:p-5"
              : "divide-y divide-slate-100"
          }
        >
          {filteredFiles.map((file) => {
            const Icon = getFileIcon(file.type);
            const selected = selectedFiles.includes(file.id);

            return (
              <article
                key={file.id}
                className={
                  view === "grid"
                    ? `rounded-xl border p-4 transition hover:border-blue-200 hover:shadow-sm ${
                        selected
                          ? "border-blue-400 bg-blue-50/50"
                          : "border-slate-200"
                      }`
                    : `flex flex-col gap-3 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center ${
                        selected ? "bg-blue-50/50" : ""
                      }`
                }
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleSelected(file.id)}
                    aria-label={`Select ${file.name}`}
                    className="mt-3 h-4 w-4 accent-blue-600"
                  />

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getFileColor(file.type)}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      title={file.name}
                      className="break-words text-sm font-semibold text-slate-800"
                    >
                      {file.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatSize(file.size)} · {file.category}
                    </p>

                    <p className="mt-2 truncate text-xs text-slate-500">
                      {file.project}
                    </p>

                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400">
                      <CalendarDays size={12} />
                      {file.date}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => downloadFile(file)}
                    aria-label={`Download ${file.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Download size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteFile(file.id)}
                    aria-label={`Delete ${file.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "File details and preview will be available after storage integration."
                      )
                    }
                    aria-label={`File details for ${file.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                  >
                    <MoreVertical size={17} />
                  </button>
                </div>
              </article>
            );
          })}

          {filteredFiles.length === 0 && (
            <div className="col-span-full px-5 py-16 text-center">
              <FolderOpen
                size={35}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-3 text-sm font-semibold text-slate-700">
                No files found
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Try another search or upload a new file.
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Upload a File
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 px-5 py-4">
          <p className="text-xs text-slate-400">
            Showing {filteredFiles.length} of {files.length} files
          </p>
        </div>
      </section>
    </div>
  );
}