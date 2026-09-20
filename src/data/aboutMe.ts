export const personalInfoObject = `const personalInfo: PersonalInfo = {
    firstName: "Stefano",
    lastName: "Del Prete",
    getFullName: function(): string {
        return \`\${this.firstName} \${this.lastName}\`
    },
    age: undefined, // Not public
    gender: "Male",
    birthday: new Date([[currentTimestamp]]).toLocaleString('it').split(',')[0].replace('[[currentYear]]', '200#'), // aka 15/03/200#
    nationality: "Italian", // Suca
    status: "[[striketrhoughStart]]Single[[striketrhoughEnd]] [[striketrhoughStart]]Alone... :([[striketrhoughEnd]] Just Want to Die", // how to run "taskkill /f life.exe" for IRL life?
    pets: [{
        type: "rabbit",
        name: "Pallino",
        age: 11 // 81 in rabbit years
    }]
};`

export const aboutMeText = `import type {
    PersonalInfo,
    KnownLanguage,
    KnownProgrammingLanguage,
    MyApp,
    DiscordSocialInfo,
    InstagramSocialInfo,
    RevoltSocialInfo,
    GitHubSocialInfo,
    RedditSocialInfo,
    TwitterSocialInfo,
    Socials
} from "@/types/aboutMe";

/* My personal informations */

${personalInfoObject}

/* Spoken Languages */

const knownLanguages: Array<KnownLanguage> = [
    {
        name: "Italian",
        level: 100 // 0-100 (kinda obv since it's my native lang)
    },
    {
        name: "English",
        level: 90// 0-100 (this is how I think I am, idk if others think so too, but I got Cambridge B2 certification)
    },
    {
        name: "French",
        level: 2 // 0-100 (I remember just the basic things)
    }
];

/* Programming Languages, Markup Languages and Terminal */

const knownProgramming: Array<KnownProgrammingLanguage> = [
    {
        name: "Javascript", // for the comment on the status value, the question goes also for "fs.unlink('C:\\Life.exe')"
        level: 90 // 0-100
    },
    {
        name: "Typescript",
        level: 90 // 0-100
    },
    {
        name: "HTML", // for the previous comment, also for "document.getElementById('life').remove()"
        level: 60 // 0-100
    },
    {
        name: "CSS", // also for "#life { display: none; }"
        level: 60 // 0-100
    },
    {
        name: "Bash/Shell", // for "sudo rm -rf --no-preserve-root /life.sh" too
        level: 30 // 0-100
    },
    {
        name: "Kotlin",
        level: 50
    }
];

/* My Apps */

const myApps: Array<MyApp> = [
    {
        name: "Zipline Upload",
        description: "A chrome extension that lets users upload right clicked files to their [[aStart_zipline]]Zipline[[aEnd]] instance or shorten URLs with [[aStart_zipline]]Zipline[[aEnd]]",
        url: "[[aStart_ziplineUpload]]https://git.stefdp.com/Stef/Zipline-Upload-Extension[[aEnd]]"
    },
    {
        name: "Zipline Android App",
        description: "An android app that lets users manage their [[aStart_zipline]]Zipline[[aEnd]] instance",
        url: "[[aStart_ziplineApp]]https://git.stefdp.com/Stef/zipline-android-app[[aEnd]]"
    },
    {
        name: "User Apps",
        description: "A user-installed Discord bot for some utility commands such as tags (message presets), reminders, ai and more",
        url: "[[aStart_userApps]]https://discord.com/oauth2/authorize?client_id=1223221223685886032[[aEnd]]",
        source: "[[aStart_userAppsSource]]https://git.stefdp.com/Stef/Discord-User-Installed-Apps[[aEnd]]"
    },
    {
        name: "Receiptify",
        description: "Converts your top tracks to a receipt (supports last.fm and spotify)",
        url: "[[aStart_receiptify]]https://receiptify.stefdp.com[[aEnd]]"
    }
];

/* Some info about my socials */

const discord: DiscordSocialInfo = {
    botDeveloper: true,
    badges: [
        "House of Bravery",
        "Active Developer",
        "Originally Known as Stef#6705" // Switch from discriminator to pomelo (Stef#6705 => stef_dp)
    ]
};

const instagram: InstagramSocialInfo = {
    followers: 94 // Last updated March 4 2024, 21:40 (09:40 PM)
};

const revolt: RevoltSocialInfo = {
    botDeveloper: true, // inactive
    badges: [],
    publicBots: []
};

const gitHub: GitHubSocialInfo = {
    followers: 9, // Last updated March 4 2024, 21:41 (09:41 PM)
    repositories: 29 // Some are private, last updated March 4 2024, 20:41 (09:41 PM)
};

const reddit: RedditSocialInfo = {
    oldAccountKarma: 241,
    newAccountKarma: 13 // Last updated March 4 2024, 21:43 (09:43 PM)
};

const twitter: TwitterSocialInfo = {
    followers: 13 // Last updated March 4 2024, 21:44 (09:44 PM)
};

/* Exports */

const socials: Socials = {
    instagram,
    discord,
    twitter,
    revolt,
    github,
    reddit
};

export default {
    knownProgramming,
    knownLanguages,
    personalInfo,
    socials,
    myApps
};
`;

export const aboutMePlainText = `<div>
<h1 className="text-2xl font-bold">Personal Info:</h1>
<ul className="list-disc list-inside">
    <li>
        <p className="font-bold">First Name</p>: Stefano
    </li>
    <li>
        <p className="font-bold">Last Name</p>: Del Prete
    </li>
    <li>
        <p className="font-bold">Full Name</p>: Stefano Del Prete
    </li>
    <li>
        <p className="font-bold">Age</p>: Not public
    </li>
    <li>
        <p className="font-bold">Birthday</p>: 15/03/200#
    </li>
    <li>
        <p className="font-bold">Nationality</p>: Italian
    </li>
    <li>
        <p className="font-bold">Status</p>: <s>Single</s> <s>Alone... :(</s> Just Want to Die
    </li>
    <li>
        <p className="font-bold">Pets</p>:
        <ul className="list-disc list-inside ml-6">
            <li>
                <p className="font-bold">Pallino</p> - Rabbit - 11yo (81 in rabbit years)
            </li>
        </ul>
    </li>
</ul>

<h1 className="text-2xl font-bold mt-4">Spoken Languages:</h1>
<ul className="list-disc list-inside">
    <li>
        <p className="font-bold">Italian</p> - 100% (My native language)
    </li>
    <li>
        <p className="font-bold">English</p> - 90% (This is how I think I am, idk if others think so too, but I got Cambridge B2 certification)
    </li>
    <li>
        <p className="font-bold">French</p> - 2% (I remember just the basic things)
    </li>
</ul>

<h1 className="text-2xl font-bold mt-4">Programming/Markup Languages & Terminal:</h1>
<ul className="list-disc list-inside">
    <li>
        <p className="font-bold">Javascript</p> - 90%
    </li>
    <li>
        <p className="font-bold">Typescript</p> - 90%
    </li>
    <li>
        <p className="font-bold">HTML</p> - 60%
    </li>
    <li>
        <p className="font-bold">CSS</p> - 60%
    </li>
    <li>
        <p className="font-bold">Bash/Shell</p> - 30%
    </li>
    <li>
        <p className="font-bold">Kotlin</p> - 50%
    </li>
</ul>

<h1 className="text-2xl font-bold mt-4">My Apps:</h1>
<ul className="list-disc list-inside">
    <li>
        <p className="font-bold">
            <a className="link text-primary" href="https://git.stefdp.com/Stef/Zipline-Upload-Extension">Zipline Upload</a>
        </p> - A chrome extension that lets users upload right clicked files to their <a href="https://zipline.diced.sh">Zipline</a> instance or shorten URLs with <a href="https://zipline.diced.sh">Zipline</a>
    </li>
    <li>
        <p className="font-bold">
            <a className="link text-primary" href="https://git.stefdp.com/Stef/zipline-android-app">Zipline Android App</a>
        </p> - An android app that lets users manage their <a href="https://zipline.diced.sh">Zipline</a> instance
    </li>
    <li>
        <p className="font-bold">
            <a className="link text-primary" href="https://git.stefdp.com/Stef/Discord-User-Installed-Apps">User Apps</a>
        </p> - A user-installed Discord bot for some utility commands such as tags (message presets), reminders, ai and more
    </li>
</ul>
</div>`