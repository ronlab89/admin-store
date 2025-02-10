import { Toaster, toast } from "sonner";

const notify = (type, text, description) => {
  if (type === "description")
    toast.message(`${text}`, { description: `${description}` });
  if (type === "success") toast.success(`${text}`);
  if (type === "warning") toast.warning(`${text}`);
  if (type === "error") toast.error(`${text}`);
  if (type === "sonner") toast(`${text}`);
  if (type === "action")
    toast(`${text}`, {
      action: {
        label: "Deshacer",
        onClick: () => console.log("Undo"),
      },
    });
  if (type === "promise") {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Sonner" }), 2000)
      );
    toast.promise(promise, {
      loading: "Consultando...",
      success: (data) => {
        return `${data.name} ${description}`;
      },
      error: "Error",
    });
  }
};

export { Toaster, notify };
