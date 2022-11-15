declare namespace Manifold {
    type Group = {
        id: string,
        totalContracts: number,
        pinnedItems: Array<any>, //TODO: Update this when needed
        name: string,
        about: string,
        slug: string,
        mostRecentContractAddedTime: number,
        postIds: Array<string>,
        creatorId: string,
        aboutPostId: string,
        createdTime: number,
        totalMembers: number,
        mostRecentActivityTime: number,
        cachedLeaderboard: {
            topCreators: Array<{ userId: string, score: number }>,
            topTraders: Array<{ userId: string, score: number }>,
        },
        anyoneCanJoin: boolean
    };
    
    type Market = {
        id: string,
        creatorId: string,
        creatorUsername: string,
        creatorName: string,
        createdTime: number,
        creatorAvatarUrl: string,
        closeTime: number,
        question: string,
        tags: Array<string>,
        url: string,
        pool: {
            NO: number,
            YES: number
        },
        probability: number,
        p: number,
        totalLiquidity: number,
        outcomeType: string,
        mechanism: string,
        volume: number,
        volume7Days: number,
        volume24Hours: number,
        isResolved: false,
        lastUpdatedTime: number
    };

    type MarketFull = Market & {
        comments: Array<Comment>,
        bets: Array<Bet>,
        description: Description,
        textDescription: string
    };

    type Comment = {

    };

    type Bet = {
        fills: Array<Fill>,
        probBefore: number,
        userName: string,
        probAfter: number,
        limitProb: number,
        isFilled: boolean,
        userUsername: string,
        loanAmount: number,
        fees: Fee,
        shares: number,
        outcome: string,
        createdTime: number,
        amount: number,
        userId: string,
        orderAmount: number,
        userAvatarUrl: string,
        isCancelled: boolean,
        contractId: string,
        id: string
    };

    type Fill = {
        matchedBetId: string | undefined,
        timestamp: number,
        shares: number,
        amount: number
    };

    type Fee = {
        liquidityFee: number,
        creatorFee: number,
        platformFee: number
    };

    type Description = {

    };
}

type DataPoint = {
    value: string,
    time: number
} | null;

type DataSet = DataPoint[]

type DataPointsState = {
    [key: string]: DataSet
}

type DataPointsStateActionType = "ADD" | "CLEAR"

type DataPointsStateAction = {
    type: DataPointsStateActionType,
    payload: {
        [id: string]: DataPoint
    } | null
}

type SeriesSet = {
    [key: string]: {
        question: string,
        id: string,
        lineData: ISeriesApi<"Line">
    }
}

type DggEmote = {
    prefix: string,
    twitch: boolean,
    theme: string,
    minimumSubTier: number,
    image: {
        url: string,
        name: string,
        mime: string,
        height: number,
        width: number
    }[]
}