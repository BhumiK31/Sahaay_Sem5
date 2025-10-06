import { FileText, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image";
  verified: boolean;
}

const documents: Document[] = [
  { id: "1", name: "ID Proof.pdf", type: "pdf", verified: true },
  { id: "2", name: "Certificate.jpg", type: "image", verified: true },
  { id: "3", name: "Medical Certificate.pdf", type: "pdf", verified: true },
];

export const UploadedDocuments = () => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-2 mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Uploaded Documents</h2>
        </div>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-muted">
                {doc.type === "pdf" ? (
                  <FileText className="h-5 w-5 text-destructive" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
              </div>

              {doc.verified && (
                <Badge className="bg-[hsl(var(--success))] text-white border-0 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-6">
          No documents uploaded yet.
        </p>
      )}
    </Card>
  );
};
