import copy from "copy-to-clipboard";
import { notify } from "./alertNotify";

const handleCopyText = (data, message) => {
  copy(data);
  notify("success", `Se copió ${message} con éxito!`);
};

export { handleCopyText };
