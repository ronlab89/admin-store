import React from "react";
import VerticalTabs from "../tabs/VerticalTabs";
import { expenseCategories } from "../../data/expenseCategories";
import Purchase from "@/icons/Purchase";
import { useAuthStore } from "../../store/auth.store";
import { useExpenseCategoryStore } from "@/store/expenseCategory.store";
import {
  createExpenseCategory,
  updateExpenseCategory,
} from "../../utils/expenseCategoryMethods";

const ExpenseCategories = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const expenseCategoryList = useExpenseCategoryStore(
    (state) => state.expenseCategoryList
  );
  const handleExpenseCategoryList = useExpenseCategoryStore(
    (state) => state.handleExpenseCategoryList
  );

  const handleCreate = (data, setLoading, setErrorAxios) => {
    console.log({ data });
    createExpenseCategory({
      data,
      token,
      setLoading,
      setErrorAxios,
      expenseCategoryList,
      handleExpenseCategoryList,
    });
  };
  const handleEdit = (
    { name, description },
    isEdit,
    setLoading,
    setErrorAxios
  ) => {
    console.log({ name, description, data: isEdit.data });
    updateExpenseCategory({
      data: { name, description },
      token,
      id: isEdit.data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      expenseCategoryList,
      handleExpenseCategoryList,
    });
  };

  return (
    <section>
      <VerticalTabs
        data={expenseCategories}
        list={expenseCategoryList}
        icon={<Purchase width={20} height={20} />}
        type={"expense-category"}
        createMethod={handleCreate}
        editMethod={handleEdit}
      />
    </section>
  );
};

export default ExpenseCategories;
