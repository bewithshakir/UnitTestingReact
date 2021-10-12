import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";

 const QueryComponent = (): React.ReactElement => {
    const queryClient =  useQueryClient();
    const todos: any = queryClient.getQueryData("repoData");
    const {t} = useTranslation();
    return (
        <div >
            <button>
               <NavLink to="/">{t("back")}</NavLink>
            </button>
            {todos?.map((item: { title: string }) => <div key={item.title}>{item.title}</div>)}
        </div>
    );
};

export default QueryComponent;