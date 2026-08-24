// The help behind the ⓘ in the bar.
//
// Three views, three texts, each answering the same four questions in the same order: what this
// view is, why an architect works this way, how to actually do it, and what a good answer looks
// like next to a bad one. Then the areas of the screen, each named as it is labelled.
//
// It is written the way the rest of the surface is written: plain sentences, no sales language,
// no em dashes, an example instead of an adjective. English is the binding version; the German
// is a translation.

import type { Text } from "./themes";

export interface HelpItem {
  label: Text;
  text: Text;
}

export interface HelpSection {
  title: Text;
  body?: Text[];
  items?: HelpItem[];
}

export interface Help {
  title: Text;
  lede: Text;
  sections: HelpSection[];
}

export const HELP: Record<"intake" | "register" | "deck", Help> = {
  // ── Intake ────────────────────────────────────────────────────────────────
  intake: {
    title: {
      en: "The intake",
      de: "Die Erhebung",
    },
    lede: {
      en: "This view is the conversation itself, not the write-up afterwards. You fill it while the client is still talking.",
      de: "Diese Ansicht ist das Gespräch selbst, nicht das Protokoll danach. Sie füllen sie, während der Kunde noch spricht.",
    },
    sections: [
      {
        title: { en: "Why an architect asks this way", de: "Warum ein Architekt so fragt" },
        body: [
          {
            en: "A conversation produces claims. Three meetings later those claims have hardened into a slide deck, and nobody can say any more which line came from a document and which from somebody's memory of a document.",
            de: "Ein Gespräch produziert Behauptungen. Drei Termine später sind sie zu einem Foliensatz erstarrt, und niemand kann mehr sagen, welche Zeile aus einem Dokument stammt und welche aus der Erinnerung an ein Dokument.",
          },
          {
            en: "Every question here is asked so that the answer can be checked by somebody who was not in the room. That is the whole trick. You are not collecting opinions about the platform, you are recording what is known about it and how it came to be known.",
            de: "Jede Frage hier ist so gestellt, dass die Antwort von jemandem geprüft werden kann, der nicht im Raum war. Das ist der ganze Kniff. Sie sammeln keine Meinungen über die Plattform, Sie halten fest, was über sie bekannt ist und woher.",
          },
          {
            en: "The instrument produces no recommendation, and that is deliberate. A recommendation belongs after the open points have been verified. What this does is make visible which points those are.",
            de: "Das Instrument erzeugt keine Empfehlung, und das ist Absicht. Eine Empfehlung gehört hinter die Verifikation der offenen Punkte. Was es leistet, ist sichtbar zu machen, welche Punkte das sind.",
          },
        ],
      },
      {
        title: { en: "How to answer a question", de: "Wie Sie eine Frage beantworten" },
        items: [
          {
            label: { en: "Write down the sentence, not your reading of it", de: "Den Satz aufschreiben, nicht Ihre Deutung" },
            text: {
              en: "Record what was said, close to how it was said. Your interpretation is a second layer and belongs nowhere in this field. If two people say different things, write both.",
              de: "Halten Sie fest, was gesagt wurde, nah an der Formulierung. Ihre Deutung ist eine zweite Schicht und gehört nicht in dieses Feld. Sagen zwei Personen Verschiedenes, schreiben Sie beides.",
            },
          },
          {
            label: { en: "Add the source if there is one", de: "Den Beleg eintragen, falls es einen gibt" },
            text: {
              en: "A document ID, a link, or a name with a date. If there is no source, leave it empty and do not tag the answer as a fact. An empty source field is information.",
              de: "Eine Dokument-ID, ein Link oder ein Name mit Datum. Gibt es keinen Beleg, lassen Sie das Feld leer und markieren die Antwort nicht als Fakt. Ein leeres Belegfeld ist eine Information.",
            },
          },
          {
            label: { en: "Set the cell in the grid", de: "Die Zelle im Gitter setzen" },
            text: {
              en: "One click sets both axes at once: what kind of knowledge this is, and what work is still outstanding on it. Do it in the room, while the answer is fresh. Deciding it later is guessing.",
              de: "Ein Klick setzt beide Achsen: welche Art von Wissen das ist, und welche Arbeit daran noch offen ist. Tun Sie es im Raum, solange die Antwort frisch ist. Später entschieden, ist es geraten.",
            },
          },
          {
            label: { en: "Say unknown when it is unknown", de: "Unbekannt sagen, wenn es unbekannt ist" },
            text: {
              en: "The most useful answer in a first pass is often that nobody knows. Mark it unknown and it becomes a task instead of a gap. Nothing is ever filled in from experience.",
              de: "Die nützlichste Antwort im ersten Durchgang ist oft, dass es niemand weiß. Markieren Sie sie als unbekannt, dann wird sie zur Aufgabe statt zur Lücke. Nichts wird aus Erfahrung ergänzt.",
            },
          },
        ],
      },
      {
        title: { en: "What a good answer looks like", de: "Wie eine gute Antwort aussieht" },
        items: [
          {
            label: { en: "Good", de: "Gut" },
            text: {
              en: "\"Changes take six to nine months because nobody can predict the impact on the eleven attached systems.\" Tagged fact, source: change statistics 2024 to 2026. It names a number, a cause and a document. A stranger can check it.",
              de: "„Änderungen dauern sechs bis neun Monate, weil niemand die Auswirkung auf die elf angeschlossenen Systeme vorhersagen kann.\" Getaggt als Fakt, Beleg: Änderungsstatistik 2024 bis 2026. Sie nennt Zahl, Ursache und Dokument. Ein Fremder kann das prüfen.",
            },
          },
          {
            label: { en: "Weak", de: "Schwach" },
            text: {
              en: "\"The platform is hard to change.\" Nobody can check that, nobody can act on it, and in three weeks it will be quoted as a finding. If that is all you have, tag it as a statement with an open verification and it stays honest.",
              de: "„Die Plattform ist schwer änderbar.\" Das kann niemand prüfen, niemand danach handeln, und in drei Wochen wird es als Befund zitiert. Wenn Sie nicht mehr haben, taggen Sie es als Aussage mit offener Verifikation, dann bleibt es ehrlich.",
            },
          },
          {
            label: { en: "Also good", de: "Ebenfalls gut" },
            text: {
              en: "\"Nobody in the room could say when the last restore test was.\" Tagged unknown. That is not a failure of the conversation, it is its most valuable line, and it goes straight into the register.",
              de: "„Niemand im Raum konnte sagen, wann der letzte Restore-Test war.\" Getaggt als unbekannt. Das ist kein Scheitern des Gesprächs, sondern seine wertvollste Zeile, und sie geht direkt ins Register.",
            },
          },
        ],
      },
      {
        title: { en: "The evidence grid", de: "Das Beleggitter" },
        body: [
          {
            en: "Two independent dimensions that never collapse into one. Across: what kind of knowledge this is. Down: what work is still outstanding on it. A statement with an open verification stays a statement. It does not become a fact by being written down.",
            de: "Zwei unabhängige Dimensionen, die nie zu einer verschmelzen. Waagerecht: welche Art von Wissen das ist. Senkrecht: welche Arbeit daran noch offen ist. Eine Aussage mit offener Verifikation bleibt eine Aussage. Sie wird nicht zum Fakt, weil sie aufgeschrieben wurde.",
          },
        ],
        items: [
          {
            label: { en: "Fact", de: "Fakt" },
            text: {
              en: "Documented and traceable. Requires a source. Without one it is not a fact, whatever it feels like.",
              de: "Dokumentiert und nachvollziehbar. Braucht einen Beleg. Ohne ihn ist es kein Fakt, wie sicher es sich auch anfühlt.",
            },
          },
          {
            label: { en: "Statement", de: "Aussage" },
            text: {
              en: "Somebody said it and it may well be right. It is a statement until a document says the same thing. Not a lesser fact, a different thing.",
              de: "Jemand hat es gesagt, und es mag stimmen. Es bleibt eine Aussage, bis ein Dokument dasselbe sagt. Kein schlechterer Fakt, eine andere Sache.",
            },
          },
          {
            label: { en: "Assumption", de: "Annahme" },
            text: {
              en: "Nobody said it outright; the room proceeded as if it were true. These are the lines that later turn out to have carried the whole plan.",
              de: "Niemand hat es ausgesprochen; der Raum ist so verfahren, als stimme es. Das sind die Zeilen, die sich später als Träger des ganzen Plans herausstellen.",
            },
          },
          {
            label: { en: "Unknown", de: "Unbekannt" },
            text: {
              en: "Nobody knows. Always open, never anything else, and the grid draws that rule rather than enforcing it quietly.",
              de: "Niemand weiß es. Immer offen, nie etwas anderes, und das Gitter zeichnet diese Regel, statt sie still zu erzwingen.",
            },
          },
          {
            label: { en: "None, open, blocked", de: "Keine, offen, blockiert" },
            text: {
              en: "Nothing outstanding, something to verify, or verification is blocked by something else. Open and blocked both enter the register. Blocked is the one that changes a plan.",
              de: "Nichts offen, etwas zu prüfen, oder die Prüfung ist durch etwas anderes blockiert. Offen und blockiert gehen beide ins Register. Blockiert ist das, was einen Plan ändert.",
            },
          },
        ],
      },
      {
        title: { en: "The areas of this view", de: "Die Bereiche dieser Ansicht" },
        items: [
          {
            label: { en: "Block rail, 1 to 10", de: "Blockleiste, 1 bis 10" },
            text: {
              en: "The ten theme blocks, in the header of the card. A dot on a number means that block has open points. The arrows step through them.",
              de: "Die zehn Themenblöcke, im Kopf der Karte. Ein Punkt an einer Zahl heißt: dieser Block hat offene Punkte. Die Pfeile blättern durch.",
            },
          },
          {
            label: { en: "The lead paragraph", de: "Der Einleitungstext" },
            text: {
              en: "Two sentences on why this block exists at all. Read it once before you start the block; it tells you what the questions are trying to separate.",
              de: "Zwei Sätze, warum es diesen Block überhaupt gibt. Einmal lesen, bevor Sie ihn beginnen; er sagt, was die Fragen auseinanderhalten sollen.",
            },
          },
          {
            label: { en: "Question ID", de: "Frage-ID" },
            text: {
              en: "Q6.1 and the like. Language-neutral, stable across versions, and the handle everything else refers to: the register, the slides, the export.",
              de: "Q6.1 und dergleichen. Sprachneutral, über Versionen stabil, und der Griff, auf den sich alles andere bezieht: Register, Folien, Export.",
            },
          },
          {
            label: { en: "Answer field", de: "Antwortfeld" },
            text: {
              en: "Grows with what you write. The grey text in it is an example of the shape a usable answer has, and it is never carried into an answer you did not give.",
              de: "Wächst mit dem, was Sie schreiben. Der graue Text darin ist ein Beispiel für die Form einer brauchbaren Antwort und wird nie in eine Antwort übernommen, die Sie nicht gegeben haben.",
            },
          },
          {
            label: { en: "Source", de: "Beleg/Quelle" },
            text: {
              en: "Where the answer comes from. A fact without one is flagged, in red, immediately. That flag is doing its job.",
              de: "Woher die Antwort stammt. Ein Fakt ohne Beleg wird sofort rot markiert. Diese Markierung tut genau ihre Arbeit.",
            },
          },
          {
            label: { en: "Red flags", de: "Red Flags" },
            text: {
              en: "At the foot of the block: the answers that should make you ask again. They are prompts for you, not findings about the client.",
              de: "Am Fuß des Blocks: die Antworten, bei denen Sie nachfragen sollten. Sie sind Hinweise für Sie, keine Befunde über den Kunden.",
            },
          },
          {
            label: { en: "The counter in the bar", de: "Der Zähler in der Leiste" },
            text: {
              en: "Answered out of total, and the small board beside it is the same grid in miniature: the shape of the conversation so far.",
              de: "Beantwortet von gesamt, und das kleine Brett daneben ist dasselbe Gitter in Miniatur: die Form des bisherigen Gesprächs.",
            },
          },
        ],
      },
    ],
  },

  // ── Register ──────────────────────────────────────────────────────────────
  register: {
    title: { en: "The to-verify register", de: "Das To-Verify-Register" },
    lede: {
      en: "Everything that is not yet verified, in one list, in a size you can turn the screen around and show to the client.",
      de: "Alles, was noch nicht verifiziert ist, in einer Liste, in einer Größe, in der Sie den Bildschirm umdrehen und ihn dem Kunden zeigen können.",
    },
    sections: [
      {
        title: { en: "Why this list exists", de: "Warum es diese Liste gibt" },
        body: [
          {
            en: "It is the deliverable of a first pass. Not the situation picture, not the option space: the list of things that must be true before anybody may decide, and are not yet known to be true.",
            de: "Sie ist das Ergebnis eines ersten Durchgangs. Nicht das Lagebild, nicht der Optionsraum: die Liste der Dinge, die wahr sein müssen, bevor jemand entscheiden darf, und von denen noch nicht bekannt ist, dass sie es sind.",
          },
          {
            en: "Turning the screen around at this point changes the meeting. The client stops hearing an assessment of their platform and starts seeing a work list they can act on, with your name nowhere near a verdict.",
            de: "Den Bildschirm an dieser Stelle umzudrehen, verändert den Termin. Der Kunde hört keine Bewertung seiner Plattform mehr, sondern sieht eine Arbeitsliste, an der er handeln kann, und Ihr Name steht nirgends an einem Urteil.",
          },
        ],
      },
      {
        title: { en: "What lands here", de: "Was hier landet" },
        items: [
          {
            label: { en: "Open", de: "Offen" },
            text: {
              en: "Something is to be verified and somebody can go and do it. Most of the list is this.",
              de: "Etwas ist zu prüfen, und jemand kann hingehen und es tun. Der größte Teil der Liste ist das.",
            },
          },
          {
            label: { en: "Blocked", de: "Blockiert" },
            text: {
              en: "Verification cannot proceed: the person left, the system is gone, the document was never written. These are the entries that change a schedule, and they belong at the top of the conversation.",
              de: "Die Prüfung kommt nicht voran: die Person ist weg, das System abgeschaltet, das Dokument nie geschrieben. Das sind die Einträge, die einen Zeitplan ändern, und sie gehören an den Anfang des Gesprächs.",
            },
          },
          {
            label: { en: "An empty register", de: "Ein leeres Register" },
            text: {
              en: "On a first pass through an existing platform, an empty register is a finding about the conversation, not a result about the platform. Somebody was not asked, or somebody was too polite.",
              de: "Bei einem ersten Durchgang durch eine gewachsene Plattform ist ein leeres Register ein Befund über das Gespräch, kein Ergebnis über die Plattform. Jemand wurde nicht gefragt, oder jemand war zu höflich.",
            },
          },
        ],
      },
      {
        title: { en: "How to work it afterwards", de: "Wie Sie danach damit arbeiten" },
        body: [
          {
            en: "Export it as Markdown from the icon in the bar. Each entry keeps its question ID, so the verified answer can be written back against the same handle and the next pass starts where this one stopped.",
            de: "Über das Icon in der Leiste als Markdown exportieren. Jeder Eintrag behält seine Frage-ID, sodass die verifizierte Antwort gegen denselben Griff zurückgeschrieben werden kann und der nächste Durchgang dort beginnt, wo dieser aufgehört hat.",
          },
        ],
      },
    ],
  },

  // ── Presentation ──────────────────────────────────────────────────────────
  deck: {
    title: { en: "The presentation", de: "Die Präsentation" },
    lede: {
      en: "Seven slides, built from the intake alone, verbatim, with the tags. There is no model in this page and nothing on a slide was summarised, ranked or inferred.",
      de: "Sieben Folien, ausschließlich aus der Erhebung gebaut, wörtlich, mit den Tags. In dieser Seite läuft kein Modell, und nichts auf einer Folie wurde zusammengefasst, gewichtet oder abgeleitet.",
    },
    sections: [
      {
        title: { en: "Why it gives no recommendation", de: "Warum sie keine Empfehlung gibt" },
        body: [
          {
            en: "Because it cannot honestly give one yet. Every direction on slide 4 carries the question IDs it depends on, and while those are open the direction is not decision-ready. Saying so out loud is the service.",
            de: "Weil sie noch keine ehrlich geben kann. Jede Richtung auf Folie 4 trägt die Frage-IDs, von denen sie abhängt, und solange die offen sind, ist die Richtung nicht entscheidungsreif. Das laut zu sagen, ist die Leistung.",
          },
          {
            en: "Option zero on slide 3 is always \"carry on as before\", because the status quo is an option and its price is the price of inaction. Option two is always \"defer and run Discovery\", with the count of what that would close. No option is scored.",
            de: "Option null auf Folie 3 ist immer „Weiter wie bisher\", denn der Status quo ist eine Option, und sein Preis ist der Preis der Untätigkeit. Option zwei ist immer „Entscheidung vertagen und Discovery\", mit der Zahl dessen, was das schließen würde. Keine Option wird bewertet.",
          },
        ],
      },
      {
        title: { en: "The seven slides", de: "Die sieben Folien" },
        items: [
          {
            label: { en: "1 · Situation and assumptions", de: "1 · Ausgangslage & Annahmen" },
            text: {
              en: "The presenting problem in the words it was given, the decision head, and the board: every answer on the cell it was tagged with. One look says what kind of conversation this was.",
              de: "Das vordergründige Problem im gegebenen Wortlaut, der Entscheidungskopf, und das Brett: jede Antwort auf ihrer Zelle. Ein Blick sagt, was für ein Gespräch das war.",
            },
          },
          {
            label: { en: "2 · Goals and criteria", de: "2 · Ziele & Entscheidungskriterien" },
            text: {
              en: "What success would look like to a neutral observer, who judges it, what is in and out of scope, and what happens if the deadline passes undecided.",
              de: "Wie Erfolg für einen neutralen Beobachter aussähe, wer darüber urteilt, was im Scope liegt und was nicht, und was passiert, wenn die Frist ohne Entscheidung verstreicht.",
            },
          },
          {
            label: { en: "3 · Options", de: "3 · Optionen" },
            text: {
              en: "Three columns, in a fixed order, with the costs quoted from the intake and never computed here.",
              de: "Drei Spalten in fester Reihenfolge, mit den Kosten aus der Erhebung zitiert und hier nie berechnet.",
            },
          },
          {
            label: { en: "4 · Undecided directions", de: "4 · Nicht entschiedene Richtungen" },
            text: {
              en: "The open points, grouped by the theme block they came from. The grouping is the intake's own structure, not a new taxonomy, and every ID stays visible.",
              de: "Die offenen Punkte, gruppiert nach dem Themenblock, aus dem sie stammen. Die Gruppierung ist die Struktur der Erhebung, keine neue Taxonomie, und jede ID bleibt sichtbar.",
            },
          },
          {
            label: { en: "5 · Risks and the way back", de: "5 · Risiken & Rückweg" },
            text: {
              en: "What is irreversible, what the way back costs, and whether anybody has assessed that. A red edge marks the entries whose verification is blocked.",
              de: "Was irreversibel ist, was der Rückweg kostet, und ob das jemand bewertet hat. Eine rote Kante markiert die Einträge, deren Prüfung blockiert ist.",
            },
          },
          {
            label: { en: "6 · Team and anchoring", de: "6 · Team & Verankerung" },
            text: {
              en: "Who owns the platform, where the knowledge sits, and who can stop a change without holding a formal role. Usually the slide that decides whether a plan is realistic.",
              de: "Wem die Plattform gehört, wo das Wissen sitzt, und wer eine Änderung anhalten kann, ohne eine formale Rolle zu haben. Meist die Folie, die entscheidet, ob ein Plan realistisch ist.",
            },
          },
          {
            label: { en: "7 · Open points", de: "7 · Offene Punkte" },
            text: {
              en: "The register in full, with question, answer and ID. The sign-off line leads it, because that sentence is the finding of the instrument and not a footnote to it.",
              de: "Das Register vollständig, mit Frage, Antwort und ID. Die Sign-off-Zeile führt sie an, denn dieser Satz ist der Befund des Instruments und keine Fußnote dazu.",
            },
          },
        ],
      },
      {
        title: { en: "How to present it", de: "Wie Sie sie zeigen" },
        items: [
          {
            label: { en: "Present", de: "Präsentieren" },
            text: {
              en: "Full screen, one slide, arrow keys or the space bar to move, F for full screen, Escape to leave. The dots below jump straight to a slide.",
              de: "Vollbild, eine Folie, Pfeiltasten oder Leertaste zum Blättern, F für Vollbild, Esc zum Beenden. Die Punkte darunter springen direkt zu einer Folie.",
            },
          },
          {
            label: { en: "Print / save as PDF", de: "Drucken / als PDF sichern" },
            text: {
              en: "The browser's own print dialogue against a print stylesheet. The page is the slide, so a short slide is one sheet. Two of the seven carry lists and run onto a second sheet rather than losing their tail.",
              de: "Der Druckdialog des Browsers gegen eine eigene Druckvorlage. Die Seite ist die Folie, eine kurze Folie also ein Blatt. Zwei der sieben tragen Listen und laufen lieber auf ein zweites Blatt, als ihren Schluss zu verlieren.",
            },
          },
          {
            label: { en: "Before you show it", de: "Bevor Sie sie zeigen" },
            text: {
              en: "Read slide 7 first. If the sign-off sentence does not match what you are about to say out loud, the problem is in the intake and not on the slide.",
              de: "Lesen Sie zuerst Folie 7. Wenn die Sign-off-Zeile nicht zu dem passt, was Sie gleich sagen wollen, liegt das Problem in der Erhebung und nicht auf der Folie.",
            },
          },
        ],
      },
    ],
  },
};
