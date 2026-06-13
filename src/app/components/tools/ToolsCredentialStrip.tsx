import { useCallback, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import type { Certification } from "../../data/tools";
import { Re4PdfModal } from "../Re4PdfModal";
import { playUiClickSound } from "../../lib/re4Audio";

interface ToolsCredentialStripProps {
  certifications: Certification[];
}

export function ToolsCredentialStrip({
  certifications,
}: ToolsCredentialStripProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const show = reducedMotion || inView;
  const ease = [0.4, 0, 0.2, 1] as const;

  const [openCert, setOpenCert] = useState<Certification | null>(null);

  const openCertificate = useCallback((cert: Certification) => {
    if (!cert.pdfUrl) return;
    playUiClickSound();
    setOpenCert(cert);
    toast.success("Credential opened.", {
      description: `${cert.title} preview loaded.`,
      className: "re4-toast",
    });
  }, []);

  const closeCertificate = useCallback(() => {
    setOpenCert(null);
  }, []);

  if (certifications.length === 0) return null;

  return (
    <>
      <motion.section
        ref={ref}
        className="tools-credential"
        aria-label="Certifications"
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease }}
      >
        <p className="tools-credential__label">Field pass</p>
        <div className="tools-credential__list">
          {certifications.map((cert) => (
            <article key={cert.id} className="tools-credential__card">
              <span className="tools-credential__badge">{cert.badge}</span>
              <div className="tools-credential__body">
                <p className="tools-credential__title">{cert.title}</p>
                <p className="tools-credential__meta">
                  {cert.issuer} · {cert.note}
                </p>
              </div>
              {cert.pdfUrl ? (
                <button
                  type="button"
                  className="tools-credential__view exp-intel__link"
                  onClick={() => openCertificate(cert)}
                >
                  View certificate
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </motion.section>

      {openCert?.pdfUrl ? (
        <Re4PdfModal
          open={Boolean(openCert)}
          onClose={closeCertificate}
          src={openCert.pdfUrl}
          heading={`Field pass / ${openCert.badge}`}
          subtitle="Credential verification — preview mode"
          iframeTitle={`${openCert.title} — Certificate`}
          dialogLabel={`${openCert.title} certificate preview`}
        />
      ) : null}
    </>
  );
}
