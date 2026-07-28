import Image from "next/image"
import Link from "next/link"

export function HackclubWebring() {
    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex">
            <button
                type="button"
                className="mx-1 cursor-pointer"
                onClick={async () => {
                    const members = await fetch("https://webring.hackclub.com/members.json").then(res => res.json()) as ({
                        member: string,
                        url: string
                    })[]
                    
                    const meURL = new URL(document.referrer || window.location.href).hostname.toLowerCase()
                    
                    let me = members.findIndex(member => new URL(member.url).hostname.toLowerCase() === meURL)

                    if (me === -1) me = 0

                    const previous = (me - 1 + members.length) % members.length

                    window.location.href = members[previous].url;
                }}
            >
                <span className="icon-[tabler--arrow-narrow-left] size-5 align-middle" />
            </button>
            <Link href="https://webring.hackclub.com/" className="mx-1 mt-1.5 hover:underline">
                <Image
                    width={25}
                    height={25}
                    src="https://assets.hackclub.com/icon-rounded.svg"
                    alt="Hack Club Webring"
                />
            </Link>
            <button
                type="button"
                className="mx-1 cursor-pointer pt-2"
                onClick={async () => {
                    const members = await fetch("https://webring.hackclub.com/members.json").then(res => res.json()) as ({
                        member: string,
                        url: string
                    })[]

                    const meURL = new URL(document.referrer || window.location.href).hostname.toLowerCase()

                    let me = members.findIndex(member => new URL(member.url).hostname.toLowerCase() === meURL)

                    if (me === -1) me = 0
                    
                    let randomIndex = Math.floor(Math.random() * members.length)
                    
                    while (randomIndex === me) {
                        randomIndex = Math.floor(Math.random() * members.length)
                    }

                    window.location.href = members[randomIndex].url;
                }}
            >
                <span className="icon-[ion--dice] size-6" />
            </button>
            <button
                type="button"
                className="mx-1 cursor-pointer"
                onClick={async () => {
                    const members = await fetch("https://webring.hackclub.com/members.json").then(res => res.json()) as ({
                        member: string,
                        url: string
                    })[]
                    
                    const meURL = new URL(document.referrer || window.location.href).hostname.toLowerCase()
                    
                    let me = members.findIndex(member => new URL(member.url).hostname.toLowerCase() === meURL)

                    if (me === -1) me = 0

                    const next = (me + 1) % members.length

                    window.location.href = members[next].url;
                }}
            >
                <span className="icon-[tabler--arrow-narrow-right] size-5 align-middle" />
            </button>
        </div>
    )
}