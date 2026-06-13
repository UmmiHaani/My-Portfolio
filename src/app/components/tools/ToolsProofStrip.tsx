import { useCallback, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import type { ProofDocument } from "../../data/tools";
import { Re4PdfModal } from "../Re4PdfModal";
import { playUiClickSound } from "../../lib/re4Audio";

interface ToolsProofStripProps {
  documents: ProofDocument[];
}

export function ToolsProofStrip({ documents }: ToolsProofStripProps) {
  const [openPdf, setOpenPdf] = useState<ProofDocument | null>(null);

  const openDocument = useCallback((doc: ProofDocument) => {
    if (doc.pdfUrl) {
      playUiClickSound();
      setOpenPdf(doc);
      toast.success("Credential opened.", {
        description: `${doc.title} preview loaded.`,
        className: "re4-toast",
      });
      return;
    }
    if (doc.href && !doc.external) {
      playUiClickSound();
    }
  }, []);

  return (
    <>
      <section className="tools-proof" aria-label="Proof of work documents">
        <div className="tools-proof__header">
          <p className="tools-proof__label">Field dossier</p>
          <p className="tools-proof__hint re4-save-prompt">
            Credentials, research, and live deploy proof
          </p>
        </div>
        <div className="tools-proof__track">
          {documents.map((doc) => {
            const inner = (
              <>
                <span className="tools-proof__code">{doc.code}</span>
                <p className="tools-proof__title">{doc.title}</p>
                <p className="tools-proof__sub">{doc.subtitle}</p>
                {doc.external ? (
                  <ExternalLink className="tools-proof__ext" aria-hidden />
                ) : null}
              </>
            );

            if (doc.pdfUrl) {
              return (
                <button
                  key={doc.id}
                  type="button"
                  className="tools-proof__card"
                  onClick={() => openDocument(doc)}
                >
                  {inner}
                </button>
              );
            }

            if (doc.href && doc.external) {
              return (
                <a
                  key={doc.id}
                  href={doc.href}
                  className="tools-proof__card"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClickSound()}
                >
                  {inner}
                </a>
              );
            }

            if (doc.href) {
              return (
                <Link
                  key={doc.id}
                  to={doc.href}
                  className="tools-proof__card"
                  onClick={() => playUiClickSound()}
                >
                  {inner}
                </Link>
              );
            }

            return (
              <article key={doc.id} className="tools-proof__card tools-proof__card--static">
                {inner}
              </article>
            );
          })}
        </div>
      </section>

      {openPdf?.pdfUrl ? (
        <Re4PdfModal
          open={Boolean(openPdf)}
          onClose={() => setOpenPdf(null)}
          src={openPdf.pdfUrl}
          heading={`Field pass / ${openPdf.code}`}
          subtitle="Credential verification — preview mode"
          iframeTitle={`${openPdf.title} — Certificate`}
          dialogLabel={`${openPdf.title} certificate preview`}
        />
      ) : null}
    </>
  );
}
