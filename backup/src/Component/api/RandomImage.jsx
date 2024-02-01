import React, { useState, useRef, useEffect, useContext } from "react";
import axios from 'axios'
import { MyContext } from "../../Context/Mycontext";

export default function RandomImage({ userInput }) {
    const { setListen, } = useContext(MyContext);
    const hasMounted = useRef(false);
    const dogBreeds = [
        'affenpinscher',
        'african',
        'airedale',
        'akita',
        'appenzeller',
        'shepherd australian',
        'basenji',
        'beagle',
        'bluetick',
        'borzoi',
        'bouvier',
        'boxer',
        'brabancon',
        'briard',
        'norwegian buhund',
        'boston bulldog',
        'english bulldog',
        'french bulldog',
        'staffordshire bullterrier',
        'australian cattledog',
        'chihuahua',
        'chow',
        'clumber',
        'cockapoo',
        'border collie',
        'coonhound',
        'cardigan corgi',
        'cotondetulear',
        'dachshund',
        'dalmatian',
        'great dane',
        'scottish deerhound',
        'dhole',
        'dingo',
        'doberman',
        'norwegian elkhound',
        'entlebucher',
        'eskimo',
        'lapphund finnish',
        'bichon frise',
        'germanshepherd',
        'italian greyhound',
        'groenendael',
        'havanese',
        'afghan hound',
        'basset hound',
        'blood hound',
        'english hound',
        'ibizan hound',
        'plott hound',
        'walker hound',
        'husky',
        'keeshond',
        'kelpie',
        'komondor',
        'kuvasz',
        'labradoodle',
        'labrador',
        'leonberg',
        'lhasa',
        'malamute',
        'malinois',
        'maltese',
        'bull mastiff',
        'english mastiff',
        'tibetan mastiff',
        'mexicanhairless',
        'mix',
        'bernese mountain',
        'swiss mountain',
        'newfoundland',
        'otterhound',
        'caucasian ovcharka',
        'papillon',
        'pekinese',
        'pembroke',
        'miniature pinscher',
        'pitbull',
        'german pointer',
        'germanlonghair pointer',
        'pomeranian',
        'medium poodle',
        'miniature poodle',
        'standard poodle',
        'toy poodle',
        'pug',
        'puggle',
        'pyrenees',
        'redbone',
        'chesapeake retriever',
        'curly retriever',
        'flatcoated retriever',
        'golden retriever',
        'rhodesian ridgeback',
        'rottweiler',
        'saluki',
        'samoyed',
        'schipperke',
        'giant schnauzer',
        'miniature schnauzer',
        'italian segugio',
        'english setter',
        'gordon setter',
        'irish setter',
        'sharpei',
        'english sheepdog',
        'shetland sheepdog',
        'shiba',
        'shihtzu',
        'blenheim spaniel',
        'brittany spaniel',
        'cocker spaniel',
        'irish spaniel',
        'japanese spaniel',
        'sussex spaniel',
        'welsh spaniel',
        'japanese spitz',
        'english springer',
        'stbernard',
        'american terrier',
        'australian terrier',
        'bedlington terrier',
        'border terrier',
        'cairn terrier',
        'dandie terrier',
        'fox terrier',
        'irish terrier',
        'kerryblue terrier',
        'lakeland terrier',
        'norfolk terrier',
        'norwich terrier',
        'patterdale terrier',
        'russell terrier',
        'scottish terrier',
        'sealyham terrier',
        'silky terrier',
        'tibetan terrier',
        'toy terrier',
        'welsh terrier',
        'westhighland terrier',
        'wheaten terrier',
        'yorkshire terrier',
        'tervuren',
        'vizsla',
        'spanish waterdog',
        'weimaraner',
        'whippet',
        'irish wolfhound'
    ];

    useEffect(() => {
        if (!hasMounted.current) {
            // Only run the effect on the initial mount
            hasMounted.current = true;
            fetchImage();
        }
    }, []);

    const [imageUrl, setImageUrl] = useState("")
    const fetchImage = async () => {
        try {
            if (userInput.includes("dog")) {
                const foundBreed = dogBreeds.find(dog => dog.toLowerCase().includes(userInput.toLowerCase()));
                if (foundBreed) {
                    let breedName = foundBreed.split(" ");
                    if (breedName.length > 1) {
                        breedName = breedName.reverse().join("/");
                    }
                    const data = await axios.get(`https://dog.ceo/api/breed/${breedName}/images/random`)
                    setImageUrl(data.data.message);
                } else {
                    const data = await axios.get("https://dog.ceo/api/breeds/image/random ")
                    setImageUrl(data.data.message);
                }
            } else if (userInput.includes("human")) {
                const data = await axios.get(`https://source.unsplash.com/random/?${"RandomName"}`)
                setImageUrl(data.data.message);
            }


        } catch (err) {
            console.log("ERror", err)
            return setListen(true)
        }
    }
    return (
        <div>

        </div>
    )
}
