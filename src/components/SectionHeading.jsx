export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  return (
    <div className={`mb-8 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-800">
          {eyebrow}
        </p>
      )}

      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}