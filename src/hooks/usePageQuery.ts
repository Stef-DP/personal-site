import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePageQuery() {
	const [page, setPage] = useState<string | null>(null);
	const searchParams = useSearchParams();

	useEffect(() => {
		setPage(searchParams.get("page"));
	}, [searchParams]);

	return page;
}
