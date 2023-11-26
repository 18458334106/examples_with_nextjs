import { getExamples } from "@/api/examples"

export let examplesArr = []
export const get_examples = async() => {
    const res = await getExamples()
    examplesArr = res.data || []
}