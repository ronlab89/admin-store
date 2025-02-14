import { lazy, Suspense, useEffect, useState } from "react";
import InputText from "@/components/InputText";
import Letter from "@/icons/Letter";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";
const Loader = lazy(() => import("@/components/Loader"));
import Dots from "@/icons/Dots";
import Select from "@/components/Select";
import { useToggleStore } from "@/store/toggle.store";
import { useShallow } from "zustand/shallow";
import Button from "@/components/Button";
import Save from "@/icons/Save";

const VerticalTabs = ({ data, list, icon, type, createMethod, editMethod }) => {
  const { handleToggleSelect } = useToggleStore(
    useShallow((state) => ({
      handleToggleSelect: state.handleToggleSelect,
    }))
  );
  const [activeTab, setActiveTab] = useState(data[0].id);
  const [activeSubTab, setActiveSubTab] = useState(data[0].subcategories[0].id);
  const [inputValue, setInputValue] = useState({
    name: data[0].subcategories[0].id,
    description: data[0].subcategories[0].description,
  });
  const [isEdit, setIsEdit] = useState({ status: false, id: null, data: null });

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { required, validateTrim } = formValidate();

  const onRegister = (data) => {
    createMethod(data, setLoading, setErrorAxios);
  };

  const onEdit = ({ name, description }) => {
    editMethod({ name, description }, isEdit, setLoading, setErrorAxios);
    handleToggleSelect(false, null);
    setIsEdit({ status: false, id: null, data: null });
  };

  useEffect(() => {
    setValue("name", inputValue.name);
    setValue("description", inputValue.description);
  }, [inputValue.name, inputValue.description, setValue]);

  useEffect(() => {
    if (activeTab === "custom" || isEdit.status)
      reset({
        name: "",
        description: "",
      });
  }, [activeTab, isEdit]);

  return (
    <div className="md:flex">
      <ul className="w-[20%] flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {data.map((item) => (
          <li
            key={item?.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-slate-200
                        ${
                          activeTab === item.id
                            ? "bg-teal-600 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-400 border-teal-600 dark:border-teal-400 text-slate-100 dark:text-slate-800"
                            : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"
                        }
                        rounded-[.5rem] active w-full hover:transition-colors`}
            aria-current="page"
          >
            {icon}
            {item?.name}
          </li>
        ))}
      </ul>
      <article className=" p-6 bg-slate-100 text-medium text-slate-800 dark:text-slate-200 dark:bg-slate-900 rounded-[.5rem] w-full">
        <p className="mb-4 text-sm">
          A la izquierda, selecciona el área que mejor se adapte a tus
          necesidades y luego elige la categoría correspondiente. Si no
          encuentras la opción que buscas, selecciona Personalizado para crear
          una nueva categoría.
        </p>
        <div className="flex flex-wrap justify-start gap-6">
          {data
            .filter((tab) => tab.id === activeTab)[0]
            .subcategories.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveSubTab(item.id);
                  setInputValue({
                    name: item.name,
                    description: item.description,
                  });
                }}
                className={`w-[150px] h-[40px] cursor-pointer text-xs border-2 rounded-[.5rem] flex justify-center items-center gap-2
                        ${
                          activeSubTab === item.id
                            ? "text-teal-600 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-400 border-teal-600 dark:border-teal-400"
                            : "text-slate-800 hover:text-slate-700 dark:text-slate-200 dark:hover:text-slate-300 border-slate-200 hover:border-slate-400 dark:border-slate-200 dark:hover:border-slate-400"
                        }
                        hover:transition-colors`}
              >
                {item.name}
              </div>
            ))}
        </div>
        <div className="w-full h-full px-6 flex flex-col items-start">
          <div className="w-full h-fit px-0 py-10 ">
            <form
              onSubmit={handleSubmit(onRegister)}
              className="w-full flex gap-5 justify-center items-center"
              noValidate
            >
              {activeTab === "custom" ? (
                <>
                  <InputText
                    icon={<Letter width={16} height={16} styles={""} />}
                    type={"text"}
                    text={"Categoria seleccionada"}
                    placeholder={"Escribe el nombre "}
                    name={"name"}
                    id={"name"}
                    divStyles={"min-w-[30%] max-w-[50%]"}
                    error={errors.name && "error-input"}
                    {...register("name", {
                      required,
                      validate: validateTrim,
                    })}
                    errorId={errors.name}
                  />
                  <InputText
                    icon={<Letter width={16} height={16} styles={""} />}
                    type={"text"}
                    text={"Descripcion de la categoria"}
                    placeholder={"Escribe la descripción"}
                    name={"description"}
                    id={"description"}
                    divStyles={"min-w-[30%] max-w-[50%]"}
                    error={errors.description && "error-input"}
                    {...register("description", {
                      required,
                      validate: validateTrim,
                    })}
                    errorId={errors.description}
                  />
                </>
              ) : (
                <>
                  <InputText
                    icon={<Letter width={16} height={16} styles={""} />}
                    type={"text"}
                    text={"Categoria seleccionada"}
                    placeholder={"Escribe el nombre "}
                    name={"name"}
                    id={"name"}
                    value={inputValue.name}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, name: e.target.value })
                    }
                    divStyles={"min-w-[30%] max-w-[50%]"}
                    error={errors.name && "error-input"}
                    {...register("name", {
                      required,
                      validate: validateTrim,
                    })}
                    errorId={errors.name}
                  />
                  <InputText
                    icon={<Letter width={16} height={16} styles={""} />}
                    type={"text"}
                    text={"Descripcion de la categoria"}
                    placeholder={"Escribe la descripción"}
                    name={"description"}
                    id={"description"}
                    value={inputValue.description}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        description: e.target.value,
                      })
                    }
                    divStyles={"min-w-[30%] max-w-[50%]"}
                    error={errors.description && "error-input"}
                    {...register("description", {
                      required,
                      validate: validateTrim,
                    })}
                    errorId={errors.description}
                  />
                </>
              )}
              <Button
                text={"Crear"}
                icon={""}
                type={"submit"}
                styles={"cursor-pointer mt-5"}
                mode={"form"}
              />
            </form>
          </div>
          <p className="text-sm font-medium">
            {type === "product-category"
              ? "Lista de categorias de productos creadas"
              : type === "payment-method"
              ? "Lista de métodos de pago"
              : type === "expense-category"
              ? "Lista de categorías de gastos"
              : ""}
          </p>
          <div className="w-full min-h-[45vh] max-h-full overflow-x-hidden overflow-y-auto border-2 border-slate-200 dark:border-slate-800 rounded-[.5rem]">
            {list?.map((item, index) => (
              <form
                key={item._id}
                onSubmit={handleSubmit(onEdit)}
                className="grid grid-cols-5 gap-2 text-xs border-b-2 border-slate-200 dark:border-slate-800 py-0.5 px-4"
                noValidate
              >
                <span className="flex justify-start items-center">
                  {isEdit.status && isEdit.id === item._id ? (
                    <InputText
                      icon={<Letter width={16} height={16} styles={""} />}
                      type={"text"}
                      text={""}
                      placeholder={item.name}
                      name={"name"}
                      id={"name"}
                      divStyles={"min-w-[50%]"}
                      error={errors.name && "error-input"}
                      {...register("name", {
                        required,
                        validate: validateTrim,
                      })}
                      errorId={errors.name}
                    />
                  ) : (
                    <span>{item?.name}</span>
                  )}
                </span>

                <span className="flex justify-start items-center col-span-3 border-l-2 border-slate-300 dark:border-slate-700 pl-2">
                  {isEdit.status && isEdit.id === item._id ? (
                    <>
                      <InputText
                        icon={<Letter width={16} height={16} styles={""} />}
                        type={"text"}
                        text={""}
                        placeholder={item.description}
                        name={"description"}
                        id={"description"}
                        divStyles={"min-w-[100%]"}
                        error={errors.description && "error-input"}
                        {...register("description", {
                          required,
                          validate: validateTrim,
                        })}
                        errorId={errors.description}
                      />
                      <button
                        type="submit"
                        className="pl-4 cursor-pointer text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors z-30"
                      >
                        <Save
                          width={20}
                          height={20}
                          styles={"text-teal-600 dark:text-teal-400"}
                        />
                      </button>
                    </>
                  ) : (
                    <span>{item?.description}</span>
                  )}
                </span>

                <div className="flex justify-end gap-2 relative">
                  <button
                    onClick={() => handleToggleSelect(true, item._id)}
                    className="inline-flex gap-2 items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-gray-100 dark:hover:bg-Shippingco-850 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 rounded-[.5rem] px-2 text-xs h-7 border-none"
                    type="button"
                    id="radix-:r48:"
                  >
                    <Dots width={18} height={18} styles={""} />

                    <span className="sr-only">Open menu</span>
                  </button>
                  <div
                    className={`absolute ${
                      index === 0
                        ? "top-0 left-[50px]"
                        : "top-[-40px] left-[50px]"
                    }`}
                  >
                    <Select
                      actions={[
                        {
                          name: "Editar",
                          func: "isEdit",
                          type: `edit-${type}`,
                          data: item,
                        },
                        {
                          name: "Eliminar",
                          func: "modalDelete",
                          type: `delete-${type}`,
                          data: item,
                        },
                      ]}
                      id={item._id}
                      toggleState={isEdit}
                      setToggleState={setIsEdit}
                    />
                  </div>
                </div>
              </form>
            ))}
          </div>
        </div>
      </article>
      {loading.createProductCategory || loading.editProductCategory ? (
        <Loader type={""} />
      ) : null}
    </div>
  );
};

export default VerticalTabs;
