const fileTypes = [
    "image/jpeg",
    "image/png",
];

export default function validateFile(file){
    return fileTypes.includes(file.type);
}