const { createStore, combineReducers } = require("redux");


// -------------------------------------------------------------
// Action creators = represents the people dropping off the form
// -------------------------------------------------------------

const createClaim = (name, amountClaiming) => {
    return {
        type: "CREATE_CLAIM",
        payload: {
            name: name,
            amountClaiming: amountClaiming,
        },
    };
};

const createPolicy = (name, policyPrice = 100) => {
    return {
        type: "CREATE_POLICY",
        payload: {
            name: name,
            policyPrice: policyPrice,
        },
    };
};

const deletePolicy = (name) => {
    return {
        type: "DELETE_POLICY",
        payload: {
            name: name,
        },
    };
};


// -------------------------------------
// Reducers = represents the departments
// -------------------------------------

const claimsHistory = (claimsRecord = [], action) => {
    if (action.type === "CREATE_CLAIM") {
        return [...claimsRecord, action.payload];
    }

    return claimsRecord;
};

const accounting = (currentSum = 1000, action) => {
    if (action.type === "CREATE_CLAIM") {
        return currentSum - action.payload.amountClaiming;
    } else if (action.type === "CREATE_POLICY") {
        return currentSum + action.payload.policyPrice;
    }

    return currentSum;
};

const policies = (listOfPolicies = [], action) => {
    if (action.type === "CREATE_POLICY") {
        return [...listOfPolicies, action.payload.name];
    } else if (action.type === "DELETE_POLICY") {
        return listOfPolicies.filter(policy => policy != action.payload.name)
    }

    return listOfPolicies;
};


// -------------------------------------
// Reducers = represents the company setup
// -------------------------------------

const reducers = combineReducers({
    claimsHistory: claimsHistory,
    currentAccount: accounting,
    policies:policies,
});



// Dispatch

const store = createStore(reducers);

store.dispatch(createPolicy("John"));
store.dispatch(createPolicy("Roshan"));
store.dispatch(createPolicy("David"));

store.dispatch(createClaim("John", 200));
store.dispatch(createClaim("David", 400));

store.dispatch(deletePolicy("John"));
console.log(store.getState());