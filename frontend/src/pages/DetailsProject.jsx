export function DetailProject({ ImageURL, title = "Project preview" }) {
  return (
    <main className="container-width py-12">
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <img src={ImageURL} alt={title} className="h-auto w-full object-cover" />
      </div>
    </main>
  );
}
