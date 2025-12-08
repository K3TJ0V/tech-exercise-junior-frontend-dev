import { useState } from "react";
import type { Campaign } from "./interfaces/Campaign";

import Kwords from "./mocks/keywords.json";
import Towns from "./mocks/towns.json";

interface CreatorProps {
    balance: number;
    handleCreation: (camp: Campaign) => void;
}

function Creator({ balance, handleCreation }: CreatorProps) {
    const [keywords, setKeywords] = useState<string[]>(["test"]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [keywordInputValue, setKeywordInputValue] = useState<string>("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fund = Number(formData.get("fund"));
        if (balance < fund) {
            alert("insufficient balance")
            return;
        }

        const name = formData.get("name") as string;
        const bidAmount = Number(formData.get("bidAmount"));
        const status = formData.get("status") == "on";
        const town = formData.get("town") as string;
        const radius = Number(formData.get("radius"));

        const campaign: Campaign = {
            name,
            keywords,
            bidAmount,
            fund,
            status,
            town,
            radius
        }
        handleCreation(campaign);
    }
    function handleKeywordDelete(key: String) {
        setKeywords(keywords.filter((word) => word !== key));
    }
    function handleKeywordsTypeahead(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setKeywordInputValue(value.trim())

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const filtered = Kwords.filter(k =>
            k.toLowerCase().includes(value.toLowerCase()) &&
            !keywords.includes(k)
        );

        setSuggestions(filtered.slice(0, 8));
    }
    function handleKeywordAdd(item: string) {
        setKeywords([...keywords, item])
        setSuggestions([]);
        setKeywordInputValue("");
    }

    return (
        <section className="creator">
            <form className="creator__form" onSubmit={(e) => { handleSubmit(e) }}>
                <label htmlFor="name">Name: </label>
                <input type="text" className="creator__input" name="name" id="name" required />
                <label htmlFor="keyword">Keyword: </label>
                <div className="keyword-wrapper">
                    <input type="text" className="creator__input" name="keyword" id="keyword" value={keywordInputValue} onChange={handleKeywordsTypeahead} />
                    {suggestions.length > 0 && (
                        <ul className="keyword-wrapper__suggestions">
                            {suggestions.map(item =>
                                <li onClick={() => { handleKeywordAdd(item) }} key={item}>{item}</li>
                            )}
                        </ul>
                    )}
                    <article className="creator__keywords">
                        <ul className="creator__ul">
                            {keywords.map(keyword =>
                                <li key={keyword} className="creator__ul--keyword">{keyword}
                                    <button onClick={() => handleKeywordDelete(keyword)}>x</button>
                                </li>
                            )}
                        </ul>
                    </article>
                </div>
                <label htmlFor="fund">Fund: </label>
                <input type="number" className="creator__input" name="fund" id="fund" required />
                <label htmlFor="bidAmount">Bid amount: </label>
                <input type="number" className="creator__input" name="bidAmount" id="bidAmount" required />
                <label htmlFor="town">Town: </label>
                <select className="creator__town" name="town" id="town" required>
                    <option value=""></option>
                    {Towns.map((town) =>
                        <option key={town} value="town">{town}</option>
                    )}
                </select>
                <label htmlFor="radius">Radius: </label>
                <input type="number" className="creator__input" name="radius" id="radius" required />km
                <label htmlFor="status">Active: </label>
                <input type="checkbox" className="creator__input" name="status" id="status" />
                <button type="submit" className="creator__submit">Create</button>
            </form>
        </section>
    )
}

export default Creator;