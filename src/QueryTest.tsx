import React from "react"
import { useQueryClient } from "react-query"

export const QueryComponent = (): React.ReactElement => {
    const queryClient =  useQueryClient()
    const todos: any = queryClient.getQueryData("repoData")
    console.log(todos, "cacheTodos")
    return (
        <div >
            {todos?.map((item: { title: string }) => <div key={item.title}>{item.title}</div>)}
        </div>
    )
}