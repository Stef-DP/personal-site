import Link from "next/link";

export function HorseRing() {
    return (
        <div className="fixed bottom-15 left-1/2 -translate-x-1/2 flex">
            <Link href="https://horser.ing/prev/stef" className="mx-1 mt-[-3px] hover:underline">
                <span className="icon-[tabler--arrow-narrow-left] size-5 align-middle" />
            </Link>

            <Link href="https://horser.ing" className="mx-1 mt-[-5px] hover:underline">
                <span className="text-xl align-middle">🐴</span>
            </Link>

            <Link href="https://horser.ing/rand" className="mx-1 hover:underline">
                <span className="icon-[ion--dice] size-6" />
            </Link>

            <Link href="https://horser.ing/next/stef" className="mx-1 mt-[-3px] hover:underline">
                <span className="icon-[tabler--arrow-narrow-right] size-5 align-middle" />
            </Link>
        </div>
    )
}