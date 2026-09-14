import { useState } from "react";
import Header from "../../../components/Header";
import type { ReportTemplate } from "../components/ReportBuilder/types";
import { INITIAL_TEMPLATES_LIST } from "../components/ReportBuilder/sampleTemplates";
import TemplateLibrary from "../components/ReportBuilder/TemplateLibrary";
import TemplateBuilder from "../components/ReportBuilder/TemplateBuilder";

interface ReportBuilderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  loadData: () => Promise<void>;
}

export default function ReportBuilder({
  open,
  setOpen,
  loading,
  loadData,
}: ReportBuilderProps) {
  const [viewMode, setViewMode] = useState<"library" | "builder">("library");
  const [templates, setTemplates] = useState<ReportTemplate[]>([
    ...INITIAL_TEMPLATES_LIST,
  ]);
  const [editingTemplate, setEditingTemplate] = useState<ReportTemplate | null>(
    null,
  );

  const handleCreateNew = () => {
    setEditingTemplate(null);
    setViewMode("builder");
  };

  const handleEditTemplate = (template: ReportTemplate) => {
    setEditingTemplate(template);
    setViewMode("builder");
  };

  const handleDeleteTemplate = (fixtureId: string) => {
    setTemplates((prev) => prev.filter((t) => t.fixtureId !== fixtureId));
  };

  const handleBackToLibrary = () => {
    setViewMode("library");
    setEditingTemplate(null);
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto">
      <Header
        open={open}
        loading={loading}
        setOpen={setOpen}
        loadData={loadData}
        page="Report Builder"
      />

      <div className="mt-4 px-6">
        {viewMode === "library" ? (
          <TemplateLibrary
            templates={templates}
            onCreateNew={handleCreateNew}
            onEditTemplate={handleEditTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        ) : (
          <TemplateBuilder
            initialTemplate={editingTemplate}
            onBackToLibrary={handleBackToLibrary}
          />
        )}
      </div>
    </main>
  );
}
