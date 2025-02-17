export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Formato de email no valido",
    },
    patternUrl: {
      value:
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?\/?$/,
      message: "Formato de url no valido",
    },
    patternPhone: {
      value: /^\d{10}$/,
      message: "10 numeros",
    },
    patternNit: {
      value: /^\d+$/,
      message: "Solo números",
    },
    minLength: {
      value: 6,
      message: "Mínimo 6 caracteres",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "No se admiten espacios en blanco";
        }
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => {
          // console.log("Compare pass: ", { pass: v, repass: value });
          v === value || "Las contraseñas no coinciden";
        },
      };
    },
  };
};
