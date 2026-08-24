import { useEffect } from "react";

import { Button } from "@heroui/react";

import type { Help } from "./help";
import { t, UI } from "./i18n";
import { pick, type Lang } from "./themes";

/**
 * The long-form help for the view you are standing in.
 *
 * A tooltip can say what a control does. It cannot say why an architect asks a question this
 * way, what separates a usable answer from a quotable one, or what the seven slides are for.
 * That needs room, so this is a panel: it slides over the work without replacing it, and Escape
 * or the backdrop closes it.
 */
export function HelpPanel({
  help,
  lang,
  onClose,
}: {
  help: Help;
  lang: Lang;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="help-scrim" onClick={onClose}>
      <aside
        className="help"
        role="dialog"
        aria-modal="true"
        aria-label={pick(help.title, lang)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="help-head">
          <h2>{pick(help.title, lang)}</h2>
          <Button variant="ghost" size="sm" isIconOnly aria-label={t(UI.close, lang)} onPress={onClose}>
            &#10005;
          </Button>
        </div>

        <p className="help-lede">{pick(help.lede, lang)}</p>

        {help.sections.map((sec, i) => (
          <section className="help-sec" key={i}>
            <h3>{pick(sec.title, lang)}</h3>
            {sec.body?.map((b, j) => (
              <p key={j}>{pick(b, lang)}</p>
            ))}
            {sec.items && (
              <dl>
                {sec.items.map((it, j) => (
                  <div key={j}>
                    <dt>{pick(it.label, lang)}</dt>
                    <dd>{pick(it.text, lang)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </aside>
    </div>
  );
}
