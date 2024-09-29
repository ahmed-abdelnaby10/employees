"use client";
import { useState } from "react";

export default function useTablePagination() {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [per_page, setPer_page] = useState(5);
    const [search, setSearch] = useState("");

    return {
        page,
        lastPage,
        per_page,
        search,
        setPage,
        setLastPage,
        setPer_page,
        setSearch,
    };
}