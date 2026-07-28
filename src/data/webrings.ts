import type { Webring } from "@/types/webrings";

export const webrings: Webring[] = [
    {
        id: "horsering",
        icon: "/images/webrings/horsering.svg",
        iconAlt: "Horsering Webring",
        name: "HR",
        url: "https://horser.ing",
        onNext: () => {
            window.location.href = "https://horser.ing/next/stef";
        },
        onPrev: () => {
            window.location.href = "https://horser.ing/prev/stef";
        },
        onRand: () => {
            window.location.href = "https://horser.ing/rand";
        },
        default: true
    },
    {
        id: "hackclub",
        icon: "https://assets.hackclub.com/icon-rounded.svg",
        iconAlt: "Hack Club Webring",
        name: "H",
        url: "https://webring.hackclub.com/",
        onNext: async () => {
            const members = await fetch("https://webring.hackclub.com/members.json").then(res => res.json()) as ({
                member: string,
                url: string
            })[]
            
            const meURL = new URL(document.referrer || window.location.href).hostname.toLowerCase()
            
            let me = members.findIndex(member => new URL(member.url).hostname.toLowerCase() === meURL)

            if (me === -1) me = 0

            const next = (me + 1) % members.length

            window.location.href = members[next].url;
        },
        onPrev: async () => {
            const members = await fetch("https://webring.hackclub.com/members.json").then(res => res.json()) as ({
                member: string,
                url: string
            })[]
            
            const meURL = new URL(document.referrer || window.location.href).hostname.toLowerCase()
            
            let me = members.findIndex(member => new URL(member.url).hostname.toLowerCase() === meURL)

            if (me === -1) me = 0

            const previous = (me - 1 + members.length) % members.length

            window.location.href = members[previous].url;
        },
        onRand: async () => {
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
        }
    }
]