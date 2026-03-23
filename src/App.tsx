import { TeamBuilderForm } from "@/components/team-builder";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <TeamBuilderForm />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
