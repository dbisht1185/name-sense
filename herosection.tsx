"use client"
import { useState } from "react"

interface GenderResult {
    name: string
    gender: string
    probability: number
    count: number
}

export default function HeroSection() {

    const [name, setName] = useState("")
    console.log(name, "name")
    const [result, setResult] = useState<GenderResult | null>(null)
    const [loading, setLoading] = useState(false)

    const apiCall = async () => {
        setLoading(true)
        const response = await fetch(`https://api.genderize.io/?name=${name}`)
        const data = await response.json()
        setResult(data)
        setLoading(false)

    }
    const ProbabilityPercentage = (prob: number) => {
        const finalData = prob * 100;
        return finalData;
    }


    return (
        <div className="w-full h-full flex flex-row justify-around gap-10 items-center px-40 bg-gray-100 min-h-[calc(100vh-72px)]"  >

            <div className="w-full h-full rounded-lg p-8 shadow-2xl flex-1">
                <p className="text-3xl font-bold mb-3">Analyze a Name</p>
                <p className="text-sm mb-3">Discover the likely gender and statistical data behind any given name worldwide.</p>
                <h1 className="font-bold text-xl mb-2">Enter Name</h1>
                <input className="w-[280px] h-[40px] border rounded-lg p-2 mt-4" type="text" placeholder="e.g. Rohan, Rahul"
                    onChange={(e) => setName(e.target.value)} />
                <button onClick={apiCall} className="w-[280px] h-[40px] rounded-lg p-2 mt-4 bg-purple-500 text-white hover:bg-purple-600 transition-colors cursor-pointer">Predict probabitlity</button>

                <div className="w-full h-full rounded-lg p-8">
                    <p className="text-sm">Powered by global naming databases. Predictions are statistical probabilities.
                    </p>
                </div>
            </div>


            <div className="w-full h-full shadow-2xl flex-1 rounded-lg">
                <div className="w-full flex flex-col items-center justify-between rounded-t-lg bg-[#4170f1]">
                    <p className="text-xl font-bold text-white my-2">Prediction Results</p>
                    <p className="text-4xl font-bold text-white" >{loading ? "Loading..." : result?.name || "NA "}</p>
                    <button className="bg-[#697deb] rounded-2xl w-[60px] h-[30px] mb-4 text-white  my-2">{result?.gender || "NA"}</button></div>
                <div className="w-full h-full  flex justify-around items-center flex-row gap-10 px-8 py-8">
                    <div className="max-w-[200px] h-full  flex justify-around items-center flex-col">
                        <p className="text-lg text-[#8b919c]">Probability</p>
                        <p className="text-2xl font-extrabold">{result?.probability ? ProbabilityPercentage(result?.probability) + "%" : "N/A"} </p>
                        <p className="text-normal text-green-700">Highly Confident</p>
                    </div>
                    <div className="max-w-[200px] max-h-[200px] rounded-lg  flex justify-around items-center flex-col ">
                        hello {result?.name}
                    </div>
                </div>
                <div className="w-full h-full  flex justify-around items-center flex-row gap-5 px-10 py-10">
                    <div className="w-full h-full flex-1 rounded-lg justify-center items-center flex flex-col bg-gray-300 px-[5px] py-3  ">
                        <p className="text-xl">Data Count</p>
                        <p className="text-4xl font-bold"> {result?.count || "NA"}</p>
                        <p>Record Analyzed</p>
                    </div>
                    <div className="w-full h-full flex-1 bg-blue-100 rounded-xl justify-center items-center flex flex-col mr-5 py-3">
                        <p className="text-xl">Gender</p>
                        <p className="text-4xl font-bold">{result?.gender || "NA"}</p>
                        <p>Predicted category</p>
                    </div>
                </div>
            </div>


        </div >
    )
} 