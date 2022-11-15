import axios from "axios";

//https://manifold.markets/api/v0/group/by-id/W2ES30fRo6CCbPNwMTTj/markets
export const GetMarketsInGroupById = async (groupId: string): Promise<Array<Manifold.Market>> => {
    const res = await axios.get<Array<Manifold.Market>>(`https://manifold.markets/api/v0/group/by-id/${groupId}/markets`);
    
    const filtered = res.data.filter(m => {
        return m.question.includes("(Permanent)") && (m.creatorUsername === "Cooley" || m.creatorUsername === "memestiny");
    })
    .map(m => {
        return {
            ...m,
            question: m.question.replace(/([\s]?[Ss]tock)?[\s]?\(Permanent\)$/, "")
        }
    });
    return filtered;
}

//https://manifold.markets/api/v0/market/03TKjwaofoz8YfCiG1dE
export const GetMarketById = async (marketId: string): Promise<Manifold.MarketFull> => {
    const res = await axios.get<Manifold.MarketFull>(`https://manifold.markets/api/v0/market/${marketId}`);
    res.data = {
        ...res.data, 
        question: res.data.question.replace(/([\s]?[Ss]tock)?[\s]?\(Permanent\)$/, "")
    }
    return res.data;
}

export const GetMarketsById = async (ids: string[]): Promise<Manifold.MarketFull[]> => {
    return await Promise.all(ids.map(id => GetMarketById(id)));
}

export const Queries = {
    GetMarketById,
    GetMarketsById,
    GetMarketsInGroupById
};

export default Queries;