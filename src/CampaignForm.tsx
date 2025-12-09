import { useState } from "react";
import type { Campaign } from "./interfaces/Campaign";

import Kwords from "./mocks/keywords.json";
import Towns from "./mocks/towns.json";

interface CreatorProps {
    initValues?: Campaign;
    balance: number;
    onSubmit: (item: Campaign) => void;
}

function CreatorForm({ initValues, balance, onSubmit }: CreatorProps) {
    const [keywords, setKeywords] = useState<string[]>(initValues?.keywords || []);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [keywordInputValue, setKeywordInputValue] = useState<string>("");

    // onChange handlers
    const [name, setName] = useState(initValues?.name || "");
    const [fund, setFund] = useState(initValues?.fund || 0);
    const [bidAmount, setBidAmount] = useState(initValues?.bidAmount || 0);
    const [town, setTown] = useState(initValues?.town || "");
    const [radius, setRadius] = useState(initValues?.radius || 0);
    const [status, setStatus] = useState(initValues?.status || false);

    const currentlyUsed = (initValues?.status ? initValues.fund : 0);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (initValues && status && fund - initValues.fund > balance) {
            alert("insufficient balance")
            return;
        }
        const campaign: Campaign = {
            name,
            keywords,
            bidAmount,
            fund,
            status,
            town,
            radius
        }
        onSubmit(campaign);
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
    function handleFundChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newFund = Number(e.target.value);
        setFund(newFund);
        
        if (status && (newFund - currentlyUsed) > balance) {
            setStatus(false);
        }
    }

    function handleStatusSwitch() {
    const required = fund - currentlyUsed;
    
    if (!status && required > balance) {
        alert("Insufficient balance to activate this campaign");
        return;
    }
    setStatus(!status);
}

    return (
        <section className="creator">
            <form className="creator__form" onSubmit={(e) => { handleSubmit(e) }}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="creator__input" name="name" id="name" required />
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
                <input type="number" value={fund ? fund : ""} onChange={(e) => { handleFundChange(e) }} className="creator__input" name="fund" id="fund" required />
                <label htmlFor="bidAmount">Bid amount: </label>
                <input type="number" value={bidAmount ? bidAmount : ""} onChange={(e) => { setBidAmount(Number(e.target.value)) }} className="creator__input" name="bidAmount" id="bidAmount" required />
                <label htmlFor="town">Town: </label>
                <select className="creator__town" value={town} onChange={(e) => { setTown(e.target.value) }} name="town" id="town" required>
                    <option value=""></option>
                    {Towns.map((town) =>
                        <option key={town} value={town}>{town}</option>
                    )}
                </select>
                <label htmlFor="radius">Radius: </label>
                <input type="number" value={radius ? radius : ""} onChange={(e) => { setRadius(Number(e.target.value)) }} className="creator__input" name="radius" id="radius" required />km
                <label htmlFor="status">Active: </label>
                <input type="checkbox" checked={status} onChange={handleStatusSwitch} className="creator__input" name="status" id="status" />
                <button type="submit" className="creator__submit">Create</button>
            </form>
        </section>
    )
}

export default CreatorForm;