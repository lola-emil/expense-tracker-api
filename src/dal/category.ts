import db from "../init/db";

const TBL_NAME = "tblcategories";

export interface Category {
    cat_id: string;
    title: string;
    user_id?: string;
}

export async function insert(category: Category) {
    const result = await db<Category>(TBL_NAME).insert(category);
    return result;
}

export async function getCategories(userId: string) {
    const result = await db<Category>(TBL_NAME).select()
        .where("user_id", userId)
        .orWhere("user_id", null);

    return result;
}

export async function deleteCategory(id: string) {
    const result = await db<Category>(TBL_NAME).delete().where("cat_id", id);
    return result;
}