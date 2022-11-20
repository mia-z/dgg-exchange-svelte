import axios from "axios";

//https://manifold.markets/api/v0/markets
export const GetAllGroups = async (): Promise<Array<Manifold.Group>> => {
    const res = await axios.get<Array<Manifold.Group>>(`https://manifold.markets/api/v0/groups`);
    return res.data;
}

//https://manifold.markets/api/v0/group/by-id/W2ES30fRo6CCbPNwMTTj/markets
export const GetMarketsInGroupById = async (groupId: string): Promise<Array<Manifold.Market>> => {
    const res = await axios.get<Array<Manifold.Market>>(`https://manifold.markets/api/v0/group/by-id/${groupId}/markets`);
    
    const filtered = res.data
    .filter(m => m.outcomeType === "BINARY");
    return filtered;
}

export const GetMarqueePermanents = async (groupId: string): Promise<Array<Manifold.Market>> => {
    const res = await axios.get<Array<Manifold.Market>>(`https://manifold.markets/api/v0/group/by-id/${groupId}/markets`);
    
    const filtered = res.data
    .filter(m => m.question.toLowerCase().includes("permanent") && m.outcomeType === "BINARY")    
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

export const GetUserById = async (id: string): Promise<Manifold.User> => {
    const res = await axios.get<Manifold.User>("https://manifold.markets/api/v0/user/by-id/" + id);
    return res.data;
}

export const Queries = {
    GetUserById,
    GetAllGroups,
    GetMarketById,
    GetMarketsById,
    GetMarketsInGroupById,
    GetMarqueePermanents
};

export default Queries;