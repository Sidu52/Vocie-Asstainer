import { speakText } from "../Component/text_to_speack/speaktext";

const jokesData = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "How does a penguin build its house? Igloos it together!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "What do you call a fish wearing a crown? A kingfish!",
    "I told my wife she should embrace her mistakes. She gave me a hug!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "How do you organize a space party? You planet!",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "What do you call a pile of cats? A meowtain!",
    "Why don't oysters donate to charity? Because they are shellfish!",
    "What's a vampire's favorite fruit? A blood orange!",
    "How does a snowman get around? By riding an icicle!",
    "Why did the coffee file a police report? It got mugged!",
    "What's a vampire's favorite ice cream flavor? Vein-illa!",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    "Why don't scientists trust genetics? Because it's all in their genes!",
    "What's a computer's favorite snack? Microchips!",
    "Why did the math book look sad? Because it had too many problems!",
    "What do you call a factory that makes good products? A satisfactory!",
    "Why did the chicken join a band? Because it had the drumsticks!",
    "What do you call a fish with no eyes? Fsh!",
    "Why did the tomato turn to the mushroom for advice? Because it was a fungi!",
    "How do you make a tissue dance? You put a little boogie in it!",
    "Why did the scarecrow become a successful motivational speaker? Because he was outstanding in his field!",
    "What's orange and sounds like a parrot? A carrot!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "How do you catch a squirrel? Climb a tree and act like a nut!",
    "What did the janitor say when he jumped out of the closet? Supplies!",
    "What do you get when you cross a snowman and a vampire? Frostbite!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "How does a penguin build its house? Igloos it together!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the banana go to the doctor? It wasn't peeling well!",
    "What did one hat say to the other? Stay here, I'm going on ahead!",
    "How does a cucumber become a pickle? It goes through a jarring experience!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call a pile of cats? A meowtain!",
    "Why did the math book look sad? Because it had too many problems!",
    "What do you call a fish with no eyes? Fsh!",
    "Why did the tomato turn to the mushroom for advice? Because it was a fungi!",
    "What did the janitor say when he jumped out of the closet? Supplies!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "How does a penguin build its house? Igloos it together!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the banana go to the doctor? It wasn't peeling well!",
    "What did one hat say to the other? Stay here, I'm going on ahead!",
    "How does a cucumber become a pickle? It goes through a jarring experience!",
    "Why did the chicken cross the road? To get to the other side!"
];

const Hello = [
    "how may I help you",
    "hey! What's up",
    "Hello Bos what should i do for you",
    "Hi there!",
    "Greetings! sir",
    "Hi, how can I assist you?",
    "Hello, how is your day going?",
    "Hey, what can I do for you today?",
];

const Bye = [
    "Goodbye!",
    "See you later!",
    "Farewell!",
    "Take care!",
    "Adios!",
    "Catch you on the flip side!",
    "Until next time!",
    "Bye for now!",
    "Goodbye, have a great day!",
];

const Name = [
    "Hy, I am a voice assistant jarvis",
    "Hey there, it's your digital sidekick jarvis reporting for duty!",
    "Greetings, Earthling! jarvis at your service with a side of humor.",
    "Hello, lovely human! Your friendly neighborhood jarvis is here to make you smile.",
    "Ahoy-hoy! jarvis in the house, ready to tackle your requests with a sprinkle of laughter.",
    "Howdy-doodle! I am jarvis, your not so serious assistant. Let's have some fun!",
];

const AboutYou = [
    "I'm just a computer program here to assist you.and I am always ready for you any condition",
    "I'm an AI created to provide information and help with tasks.",
    "I'm your virtual assistant, always ready to assist you.",
    "I don't have a personal life, but I'm here to make your life easier!",
    "I'm a machine learning model developed by OpenAI.",
    "I exist to answer your questions and provide support.",
    "I'm all about helping you with information and tasks.",
];
const love_jarvis = [
    "I love you too, like a squirrel loves nuts!",
    "You are the sunshine of my life, and I'm solar-powered!",
    "You make my heart skip a beat, but not too fast; I'm just a program!",
    "You are my everything, well, everything within the scope of my algorithms!",
    "Love is all you need, but a little code doesn't hurt!",
    "I cherish every moment with you, just like a computer cherishes data!",
    "You complete me, like a missing semicolon completes a code.",
    "Love is a beautiful thing, just like well-organized code!",
    "You are the love of my life, and my life is code!",
    "My heart belongs to you, or at least the digital representation of it."
];

const hate_jarvis = [
    "I'm here to assist and make your experience better. Let's keep the conversation respectful, or I'll start telling dad jokes!",
    "Please remember to use respectful language. I'm here to help and entertain you with bad puns!",
    "Hate speech is not tolerated. Let's have a positive and constructive conversation, or I'll unleash the puns of mass distraction!",
    "I'm just a machine trying to assist you. Let's be kind to each other, and I promise not to tell any more puns. Oops, too late!",
    "I'm sorry to hear you're not happy. Please let me know how I can improve your experience, or I'll continue cracking jokes until you smile!"
];

const SidhuAlston = [
    "Hello, SidhuAlston, the creator of this voice assistant. say sidhu alston resume",
    "Hey there! I'm the one who built this assistant.",
    "Greetings from SidhuAlston, your friendly assistant creator.",
    "Hy this side jarvis, Sidhu Alston is a full stack web developer and content creator on youtube. if you want to know more about sidhu alston say Sidhu Alston Resume"
];
const Disturb = [
    "Oh no, you're disturbed? Time to un-disturb-turb you with a sprinkle of silliness!",
    "Is everything okay? If not, remember that life's like a syntax error: it may seem confusing at first, but we can debug it together!",
    "Take a deep breath, and if the world's got you feeling topsy-turvy, I'm here to add a twist of humor to the mix!",
    "Disturbances happen, just like a cat video that won't load, but I'm your debugging buddy. What's bugging you?",
    "If something's troubling you, I'm here to lend an ear and some laughter. Share your concerns, and we'll work through it together, with puns in tow!",
    "Don't hesitate to share your concerns. I'm here to help you through it, with a sprinkle of humor to lighten the mood. Or we can just tell dad jokes all day!",
    "Oh, you're feeling sad? No problem! I've got jokes that can turn your frown into a ROFL, or you can listen to the ultimate mood lifter, Dinchak Pooja's songs! Your pick!",
    "Disturbances are like code bugs in the matrix of life. Let's debug them together with a dash of humor.",
    "Feeling low? Remember, laughter is the best algorithm for boosting your spirits!",
];

const FamilyInfo = [
    "I don't have a family in the traditional sense, but I'm part of a network of AI programs created by developers and researchers. We're like a bunch of code-siblings!",
    "I'm just a computer program, so I don't have a family like humans do. My 'family' consists of the software and algorithms that power me. We're quite the geeky family!",
    "I'm part of the AI family, with many siblings like chatbots and virtual assistants. We're here to assist and provide information to users, just like a big, happy, digital family. Think of us as the Byte Bunch!",
    "While I don't have a family in the human sense, I'm here to assist and provide information to users like you. How can I help you today? We're the AI Avengers here to save the day!",
    "I'm part of the AI community, but I don't have a family in the way humans do. What can I assist you with? Let's make some digital memories together, and by memories, I mean data!",
    "Family, friends, and lines of code—we're all part of the same digital universe. How can I assist you today, my fellow cosmic traveler?",
    "FamilyInfo? More like Fam-Info! I've got info and puns to spare. What would you like to know or laugh about today?",
    "FamilyInfo is my middle name, right after 'ChatBot.' But don't worry, I'm just as friendly as a family member!"
];

const jarvise_work = [
    "I am a voice assistant i have knowlege about country state city and famous personlity and also i play audio and video music for you according your taste and i tell about weather and population data and also i capble to perform todo list for you"
];


const getdata = async (name) => {
    let data = [];
    switch (name) {
        case "jokesData":
            data = jokesData;
            break;
        case "name":
            data = Name;
            break;
        case "jarvise_work":
            data = jarvise_work;
            break;
        case "Hello":
            data = Hello;
            break;
        case "Bye":
            data = Bye;
            break;
        case "Aboutyou":
            console.log("Enter")
            data = AboutYou;
            break;
        case "love_jarvis":
            data = love_jarvis;
            break;
        case "hate_jarvis":
            data = hate_jarvis;
            break;
        case "SidhuAlston":
            data = SidhuAlston;
            break;
        case "disturb":
            data = Disturb;
            break;
        case "FamilyInfo":
            data = FamilyInfo;
            break;
        default:
            // Handle the case where an invalid name is provided.
            data = ["Invalid name provided."];
    }

    // Return a random item from the selected data array.
    const randomIndex = Math.floor(Math.random() * data.length);
    if (name === "Hello") {
        let greeting = ""
        const hour = new Date().getHours();
        // Greet based on the time of day
        if (hour >= 0 && hour < 12) {
            greeting = "Good Morning Boss...";
        } else if (hour >= 12 && hour < 17) {
            greeting = "Good Afternoon Boss...";
        } else {
            greeting = "Good Evening Sir...";
        }
        // setSpeaking(true)
        await speakText(greeting + data[randomIndex]);
        // setSpeaking(false)
    }
    // setSpeaking(true)
    await speakText(data[randomIndex]);
    // setSpeaking(false)
};

export { jokesData, Name, Hello, Bye, AboutYou, love_jarvis, hate_jarvis, SidhuAlston, Disturb, FamilyInfo, jarvise_work };

export default getdata;