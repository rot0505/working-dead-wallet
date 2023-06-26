import React, { useRef, useEffect, useState, useCallback } from 'react';
import { bech32 } from 'bech32';
import { Buffer } from 'buffer';
import Web3 from 'web3';
import { decode, encode } from 'cbor-web';
import BigNumber from 'bignumber.js';
import { browserName } from 'react-device-detect';
import styled from 'styled-components';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var storageKey = "workingDeadWalletkey";

var SupportedWallet;
(function (SupportedWallet) {
    SupportedWallet["metamask"] = "metamask";
    SupportedWallet["eternl"] = "eternl";
    SupportedWallet["flint"] = "flint";
    SupportedWallet["nami"] = "nami";
})(SupportedWallet || (SupportedWallet = {}));
var SupportedWalletName = {
    metamask: "Metamask",
    eternl: "Eternl",
    flint: "Flint",
    nami: "Nami"
};
var SupportedChain;
(function (SupportedChain) {
    SupportedChain["ethereum"] = "ethereum";
    SupportedChain["cardano"] = "cardano";
})(SupportedChain || (SupportedChain = {}));
var NetworkMode;
(function (NetworkMode) {
    NetworkMode[NetworkMode["mainNet"] = 1] = "mainNet";
    NetworkMode[NetworkMode["testNet"] = 0] = "testNet";
})(NetworkMode || (NetworkMode = {}));
var APIErrorMessage;
(function (APIErrorMessage) {
    APIErrorMessage["manualDisconnect"] = "The request was refused due to lack of access - e.g. wallet disconnects.";
})(APIErrorMessage || (APIErrorMessage = {}));

var usePrevious = function (value) {
    var ref = useRef(value);
    useEffect(function () {
        ref.current = value;
    });
    return ref.current;
};

var asyncTimeout = function (fn, errorMessage, ms) {
    if (ms === void 0) { ms = 10000; }
    return new Promise(function (resolve, reject) {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var timeoutId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeoutId = setTimeout(function () {
                            reject(new Error(errorMessage));
                        }, ms);
                        return [4 /*yield*/, fn()];
                    case 1:
                        result = _a.sent();
                        clearTimeout(timeoutId);
                        resolve(result);
                        return [2 /*return*/];
                }
            });
        }); })();
    });
};

var addressFromHex = function (hex) {
    var networkId = hex[1] === "0" ? NetworkMode.testNet : NetworkMode.mainNet;
    var prefix = networkId === NetworkMode.testNet ? "addr_test" : "addr";
    var bytes = fromHex(hex);
    var words = bech32.toWords(bytes);
    return bech32.encode(prefix, words, 1000);
};
var fromHex = function (hex) {
    return Buffer.from(hex, "hex");
};
var formatWalletName = function (walletName) {
    var originName = walletName.split(" ")[0].toLowerCase();
    var formatedName = SupportedWalletName[originName];
    return formatedName;
};

var enableWallet = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var walletName, enabledWallet, ethereum, selectedWallet, enabledWalletAPI;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(window.cardano || window.ethereum)) {
                    throw new Error("No wallet extensions have been installed. Please install a wallet\n      extension and refresh the page.");
                }
                walletName = name || (localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem(storageKey));
                if (!walletName) {
                    throw new Error("Wallet name must be passed as an argument or have been connected previously.");
                }
                if (!(walletName === SupportedWallet.metamask)) return [3 /*break*/, 5];
                ethereum = window.ethereum;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ethereum.request({ method: "eth_requestAccounts" })];
            case 2:
                _c.sent();
                enabledWallet = {
                    name: "Metamask",
                    isEVM: true,
                };
                return [3 /*break*/, 4];
            case 3:
                _c.sent();
                enabledWallet = null;
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 7];
            case 5:
                selectedWallet = (_a = window.cardano) === null || _a === void 0 ? void 0 : _a[walletName];
                if (!selectedWallet) {
                    throw new Error("Wallet not found. Please ensure the wallet extension has been\n        installed. If it was recently installed, you may need to refresh \n        the page and try again.");
                }
                return [4 /*yield*/, asyncTimeout(selectedWallet.enable, "Enabling wallet timed out after 10 seconds", 10000)];
            case 6:
                enabledWalletAPI = _c.sent();
                enabledWallet = __assign(__assign(__assign({}, selectedWallet), enabledWalletAPI), { name: formatWalletName(selectedWallet.name) });
                _c.label = 7;
            case 7:
                (_b = window.localStorage) === null || _b === void 0 ? void 0 : _b.setItem(storageKey, walletName);
                return [2 /*return*/, enabledWallet];
        }
    });
}); };

var disconnectWallet = function () {
    var _a, _b;
    var selectedWalletName = (_a = window.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(storageKey);
    if (!selectedWalletName)
        return;
    (_b = window.localStorage) === null || _b === void 0 ? void 0 : _b.removeItem(storageKey);
};

var getWalletAddress = function (wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var addresses, provider, web3, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!wallet) {
                    throw new Error("No wallet selected");
                }
                if (!wallet.isEVM) return [3 /*break*/, 2];
                provider = window.web3.currentProvider;
                web3 = new Web3(provider);
                return [4 /*yield*/, web3.eth.getAccounts()];
            case 1:
                addresses = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, wallet.getUsedAddresses()];
            case 3:
                addresses = _a.sent();
                _a.label = 4;
            case 4:
                address = addresses[0];
                if (!address) {
                    throw new Error("Unable to fetch wallet address");
                }
                return [2 /*return*/, wallet.isEVM ? address : addressFromHex(address)];
        }
    });
}); };

var getWalletChangeAddress = function (wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var addresses, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!wallet) {
                    throw new Error("No wallet selected");
                }
                return [4 /*yield*/, wallet.getChangeAddress()];
            case 1:
                addresses = _a.sent();
                address = Array.isArray(addresses) ? addresses[0] : addresses;
                if (!address) {
                    throw new Error("Unable to fetch wallet address");
                }
                return [2 /*return*/, addressFromHex(address)];
        }
    });
}); };

var getWalletBalance = function (wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var provider, web3, address, balanceOf, balance, balanceHex, decoded, lovelaces;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!wallet) {
                    throw new Error("No wallet selected");
                }
                if (!wallet.isEVM) return [3 /*break*/, 3];
                provider = window.web3.currentProvider;
                web3 = new Web3(provider);
                return [4 /*yield*/, getWalletAddress(wallet)];
            case 1:
                address = _a.sent();
                return [4 /*yield*/, web3.eth.getBalance(address)];
            case 2:
                balanceOf = _a.sent();
                balance = BigNumber(balanceOf).div(Math.pow(10, 18));
                return [2 /*return*/, Number(balance.toString())];
            case 3: return [4 /*yield*/, wallet.getBalance()];
            case 4:
                balanceHex = _a.sent();
                decoded = decode(balanceHex);
                lovelaces = Array.isArray(decoded) ? decoded[0] : decoded;
                return [2 /*return*/, lovelaces / 1000000];
        }
    });
}); };

var supportedWallets = [
    {
        id: SupportedWallet.metamask,
        name: "Metamask",
        icon: "Metamask",
        extensionUrl: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        websiteUrl: "https://metamask.io/",
        chain: SupportedChain.ethereum
    },
    {
        id: SupportedWallet.nami,
        name: "Nami",
        icon: "Nami",
        extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
        websiteUrl: "https://namiwallet.io/",
        chain: SupportedChain.cardano
    },
    {
        id: SupportedWallet.eternl,
        name: "Eternl",
        icon: "Eternl",
        extensionUrl: "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
        websiteUrl: "https://eternl.io/",
        chain: SupportedChain.cardano
    },
    {
        id: SupportedWallet.flint,
        name: "Flint",
        icon: "Flint",
        extensionUrl: "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
        websiteUrl: "https://flint-wallet.com/",
        chain: SupportedChain.cardano
    }
];
var getSupportedWallets = function () {
    if (!["Chrome", "Brave"].includes(browserName)) {
        return [];
    }
    var installedWallets = [];
    var uninstalledWallets = [];
    supportedWallets.forEach(function (wallet) {
        if (wallet.chain === SupportedChain.ethereum) {
            if (window.ethereum) {
                installedWallets.push(__assign(__assign({}, wallet), { isInstalled: true }));
            }
            else {
                uninstalledWallets.push(__assign(__assign({}, wallet), { isInstalled: false }));
            }
        }
        else if (wallet.chain === SupportedChain.cardano) {
            if (window.cardano && window.cardano[wallet.id]) {
                installedWallets.push(__assign(__assign(__assign({}, wallet), window.cardano[wallet.id]), { isInstalled: true, name: wallet.name }));
            }
            else {
                uninstalledWallets.push(__assign(__assign({}, wallet), { isInstalled: false }));
            }
        }
    });
    return __spreadArray(__spreadArray([], installedWallets, true), uninstalledWallets, true);
};

var signWalletTransaction = function (wallet, tx) { return __awaiter(void 0, void 0, void 0, function () {
    var witnesses, decodedTx, decodedWitnesses, encodedTx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!wallet) {
                    throw new Error("No wallet selected");
                }
                return [4 /*yield*/, wallet.signTx(tx)];
            case 1:
                witnesses = _a.sent();
                decodedTx = decode(tx);
                decodedWitnesses = decode(witnesses);
                decodedTx[1] = decodedWitnesses;
                encodedTx = encode(decodedTx);
                return [2 /*return*/, encodedTx.toString("hex")];
        }
    });
}); };

var makeObservable = function (target) {
    var listeners = [];
    var value = target;
    var get = function () {
        return value;
    };
    var set = function (newValue) {
        if (JSON.stringify(value) === JSON.stringify(newValue))
            return;
        value = newValue;
        listeners.forEach(function (l) { return l(value); });
    };
    var subscribe = function (listener) {
        listeners.push(listener);
        return function () { return unsubscribe(listener); };
    };
    var unsubscribe = function (listener) {
        listeners = listeners.filter(function (l) { return l !== listener; });
    };
    return {
        get: get,
        set: set,
        subscribe: subscribe,
    };
};
var checkForInjectedWallet = function () { return __awaiter(void 0, void 0, void 0, function () {
    var retryCount, isEnabled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                retryCount = 0;
                _a.label = 1;
            case 1:
                if (!(retryCount < 50)) return [3 /*break*/, 4];
                return [4 /*yield*/, getIsWalletAvailable()];
            case 2:
                isEnabled = _a.sent();
                if (isEnabled)
                    return [2 /*return*/, true];
                retryCount++;
                return [4 /*yield*/, sleep()];
            case 3:
                _a.sent();
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
var getIsWalletAvailable = function () {
    var initialWalletName = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem(storageKey);
    if (!initialWalletName) {
        return false;
    }
    if (!window.cardano) {
        return false;
    }
    if (!window.cardano[initialWalletName]) {
        return false;
    }
    return true;
};
var sleep = function (ms) {
    if (ms === void 0) { ms = 250; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, ms);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};

var initialState = {
    isLoading: false,
    error: null,
    enabledWallet: null,
    isConnected: typeof localStorage !== 'undefined' && !!(localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem(storageKey)),
};
var store = makeObservable(initialState);

var useStore = function () {
    var _a = useState(store.get()), internalState = _a[0], setInternalState = _a[1];
    var setState = function (newState) {
        store.set(newState);
    };
    useEffect(function () {
        return store.subscribe(setInternalState);
    }, []);
    return {
        state: internalState,
        setState: setState,
    };
};

var useConnectWallet = function () {
    var _a = useStore(), state = _a.state, setState = _a.setState;
    var connect = useCallback(function (name) {
        selectWallet(name);
    }, []);
    var disconnect = useCallback(function () {
        disconnectWallet();
        setState(__assign(__assign({}, state), { enabledWallet: null }));
    }, [state]);
    var getAddress = useCallback(function (callback) { return __awaiter(void 0, void 0, void 0, function () {
        var address, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setState(__assign(__assign({}, state), { error: null, isLoading: true }));
                    return [4 /*yield*/, getWalletAddress(state.enabledWallet)];
                case 1:
                    address = _a.sent();
                    callback(address);
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    if (err_1 instanceof Error) {
                        setState(__assign(__assign({}, state), { error: err_1.message }));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setState(__assign(__assign({}, state), { isLoading: false }));
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [state]);
    var getChangeAddress = useCallback(function (callback) { return __awaiter(void 0, void 0, void 0, function () {
        var address, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setState(__assign(__assign({}, state), { error: null, isLoading: true }));
                    return [4 /*yield*/, getWalletChangeAddress(state.enabledWallet)];
                case 1:
                    address = _a.sent();
                    callback(address);
                    return [3 /*break*/, 4];
                case 2:
                    err_2 = _a.sent();
                    if (err_2 instanceof Error) {
                        setState(__assign(__assign({}, state), { error: err_2.message }));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setState(__assign(__assign({}, state), { isLoading: false }));
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [state]);
    var getBalance = useCallback(function (callback) { return __awaiter(void 0, void 0, void 0, function () {
        var balance, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setState(__assign(__assign({}, state), { error: null, isLoading: true }));
                    return [4 /*yield*/, getWalletBalance(state.enabledWallet)];
                case 1:
                    balance = _a.sent();
                    callback(balance);
                    return [3 /*break*/, 4];
                case 2:
                    err_3 = _a.sent();
                    if (err_3 instanceof Error) {
                        setState(__assign(__assign({}, state), { error: err_3.message }));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setState(__assign(__assign({}, state), { isLoading: false }));
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [state]);
    var signTransaction = useCallback(function (tx, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var signedTx, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setState(__assign(__assign({}, state), { error: null, isLoading: true }));
                    return [4 /*yield*/, signWalletTransaction(state.enabledWallet, tx)];
                case 1:
                    signedTx = _a.sent();
                    callback(signedTx);
                    return [3 /*break*/, 4];
                case 2:
                    err_4 = _a.sent();
                    if (err_4 instanceof Error) {
                        setState(__assign(__assign({}, state), { error: err_4.message }));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setState(__assign(__assign({}, state), { isLoading: false }));
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [state]);
    var selectWallet = useCallback(function (walletName) { return __awaiter(void 0, void 0, void 0, function () {
        var enabledWallet, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setState(__assign(__assign({}, state), { error: null }));
                    return [4 /*yield*/, enableWallet(walletName)];
                case 1:
                    enabledWallet = _a.sent();
                    setState(__assign(__assign({}, state), { enabledWallet: enabledWallet }));
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    disconnect();
                    if (err_5 instanceof Error && err_5.message !== APIErrorMessage.manualDisconnect) {
                        setState(__assign(__assign({}, state), { error: err_5.message }));
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [state]);
    var getEnabledWallet = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var initialWalletName, isWalletConnected, enabledWallet, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initialWalletName = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem(storageKey);
                    if (!(initialWalletName && state.isConnected && !state.enabledWallet)) return [3 /*break*/, 5];
                    return [4 /*yield*/, checkForInjectedWallet()];
                case 1:
                    isWalletConnected = _a.sent();
                    if (!isWalletConnected) {
                        setState(__assign(__assign({}, state), { isConnected: false, error: "Unable to find connected wallet." }));
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, enableWallet(initialWalletName)];
                case 3:
                    enabledWallet = _a.sent();
                    setState(__assign(__assign({}, state), { enabledWallet: enabledWallet }));
                    return [3 /*break*/, 5];
                case 4:
                    err_6 = _a.sent();
                    if (err_6 instanceof Error) {
                        setState(__assign(__assign({}, state), { isConnected: false, error: err_6.message }));
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [state]);
    useEffect(function () {
        getEnabledWallet();
    }, []);
    useEffect(function () {
        if (state.enabledWallet && !state.isConnected) {
            setState(__assign(__assign({}, state), { isConnected: true }));
        }
        if (!state.enabledWallet && state.isConnected) {
            setState(__assign(__assign({}, state), { isConnected: false }));
        }
    }, [state]);
    return {
        isConnected: state.isConnected,
        isLoading: state.isLoading,
        error: state.error,
        wallet: state.enabledWallet,
        connect: connect,
        disconnect: disconnect,
        getAddress: getAddress,
        getChangeAddress: getChangeAddress,
        getBalance: getBalance,
        getSupportedWallets: getSupportedWallets,
        signTransaction: signTransaction,
    };
};

var Typography = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? "p" : _b, _c = _a.isInverted, isInverted = _c === void 0 ? false : _c, _d = _a.style, style = _d === void 0 ? {} : _d, rest = __rest(_a, ["variant", "isInverted", "style"]);
    return React.createElement(variant, __assign({ style: __assign({ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0, color: isInverted ? "#FFF" : undefined }, style) }, rest));
};

var Flint = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 32 : _b, _c = _a.height, height = _c === void 0 ? 32 : _c, _d = _a.fill, fill = _d === void 0 ? "none" : _d;
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: width, height: height, fill: fill, viewBox: "0 0 190 190" },
        React.createElement("g", null,
            React.createElement("title", null, "Layer 1"),
            React.createElement("path", { d: "m56.011,59.385l43.4622,-44.0833c2.9708,-3.2534 4.0318,-2.9365 5.0448,0.7872l0.388,31.4881c-0.108,4.9136 -0.465,7.0326 -1.94,9.0528l-26.3881,27.1585c-3.4504,4.2667 -2.9769,5.9698 -3.1044,7.872c-0.1276,1.9022 3.3574,7.4484 9.3133,7.8721c0,0 16.1505,0.0033 17.8502,0c1.7,-0.0034 2.891,2.7346 0,5.5106l-36.4769,36.605c-4.5143,4.252 -7.068,4.24 -11.6416,2.755c-7.0196,-3.935 -7.145,-7.567 -7.3638,-13.901l-0.0093,-0.269l0,-40.1471c-0.2431,-12.7983 1.5866,-19.6181 10.8656,-30.7009z", fill: "#FF6100", id: "svg_1" }),
            React.createElement("path", { d: "m134.71,131.59l-44.7788,44.083c-3.0611,3.254 -4.154,2.937 -5.1976,-0.787l-0.3998,-31.488c0.1107,-4.913 -0.0753,-2.99857 6.35026,-10.92424l22.83594,-25.28676c3.555,-4.267 3.067,-5.97 3.199,-7.8722c0.131,-1.9022 -3.459,-7.4484 -9.596,-7.8721c0,0 -16.6397,-0.0033 -18.3913,0c-1.7515,0.0034 -2.9787,-2.735 0,-5.5104l37.5823,-36.605c4.651,-4.2523 7.283,-4.2405 11.995,-2.7552c7.232,3.935 7.361,7.5674 7.587,13.9013l0.009,0.2684l0,40.1472c0.251,12.799 -1.634,19.618 -11.195,30.701z", fill: "#FF6100", id: "svg_2" }))));
};

var Nami = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 32 : _b, _c = _a.height, height = _c === void 0 ? 32 : _c, _d = _a.fill, fill = _d === void 0 ? "none" : _d;
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: width, height: height, fill: fill, viewBox: "0 0 486.17 499.86" },
        React.createElement("g", { id: 'Layer_2', "data-name": 'Layer 2' },
            React.createElement("g", { id: 'Layer_1-2', "data-name": 'Layer 1' },
                React.createElement("path", { id: 'path16', d: 'M73.87,52.15,62.11,40.07A23.93,23.93,0,0,1,41.9,61.87L54,73.09,486.17,476ZM102.4,168.93V409.47a23.76,23.76,0,0,1,32.13-2.14V245.94L395,499.86h44.87Zm303.36-55.58a23.84,23.84,0,0,1-16.64-6.68v162.8L133.46,15.57H84L421.28,345.79V107.6A23.72,23.72,0,0,1,405.76,113.35Z', fill: "#349ea3" }),
                React.createElement("path", { id: 'path18', d: 'M38.27,0A38.25,38.25,0,1,0,76.49,38.27v0A38.28,38.28,0,0,0,38.27,0ZM41.9,61.8a22,22,0,0,1-3.63.28A23.94,23.94,0,1,1,62.18,38.13V40A23.94,23.94,0,0,1,41.9,61.8Z', fill: "#349ea3" }),
                React.createElement("path", { id: 'path20', d: 'M405.76,51.2a38.24,38.24,0,0,0,0,76.46,37.57,37.57,0,0,0,15.52-3.3A38.22,38.22,0,0,0,405.76,51.2Zm15.52,56.4a23.91,23.91,0,1,1,8.39-18.18A23.91,23.91,0,0,1,421.28,107.6Z', fill: "#349ea3" }),
                React.createElement("path", { id: 'path22', d: 'M134.58,390.81A38.25,38.25,0,1,0,157.92,426a38.24,38.24,0,0,0-23.34-35.22Zm-15,59.13A23.91,23.91,0,1,1,143.54,426a23.9,23.9,0,0,1-23.94,23.91Z', fill: "#349ea3" })))));
};

var Metamask = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 24 : _b, _c = _a.height, height = _c === void 0 ? 24 : _c;
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: width, height: height, viewBox: "0 0 212 189", id: "metamask" },
        React.createElement("g", { fill: "none", fillRule: "evenodd" },
            React.createElement("polygon", { fill: "#CDBDB2", points: "60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875" }),
            React.createElement("polygon", { fill: "#CDBDB2", points: "105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875", transform: "matrix(-1 0 0 1 256.5 0)" }),
            React.createElement("polygon", { fill: "#393939", points: "90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188" }),
            React.createElement("polygon", { fill: "#F89C35", points: "75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27" }),
            React.createElement("polygon", { fill: "#F89D35", points: "16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813" }),
            React.createElement("polygon", { fill: "#D87C30", points: "46.125 101.25 92.25 102.375 87.188 126 65.25 120.375" }),
            React.createElement("polygon", { fill: "#EA8D3A", points: "46.125 101.813 65.25 119.813 65.25 137.813" }),
            React.createElement("polygon", { fill: "#F89D35", points: "65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375" }),
            React.createElement("polygon", { fill: "#EB8F35", points: "65.25 138.375 60.75 173.25 90.563 152.438" }),
            React.createElement("polygon", { fill: "#EA8E3A", points: "92.25 102.375 95.063 150.188 86.625 125.719" }),
            React.createElement("polygon", { fill: "#D87C30", points: "39.375 138.938 65.25 138.375 60.75 173.25" }),
            React.createElement("polygon", { fill: "#EB8F35", points: "12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75" }),
            React.createElement("polygon", { fill: "#E8821E", points: "88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938" }),
            React.createElement("polygon", { fill: "#DFCEC3", points: "60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625" }),
            React.createElement("polygon", { fill: "#DFCEC3", points: "121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625", transform: "matrix(-1 0 0 1 272.25 0)" }),
            React.createElement("polygon", { fill: "#393939", points: "70.313 112.5 64.125 125.438 86.063 119.813", transform: "matrix(-1 0 0 1 150.188 0)" }),
            React.createElement("polygon", { fill: "#E88F35", points: "12.375 .563 88.875 58.5 75.938 27" }),
            React.createElement("path", { fill: "#8E5A30", d: "M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z" }),
            React.createElement("g", { transform: "matrix(-1 0 0 1 211.5 0)" },
                React.createElement("polygon", { fill: "#F89D35", points: "16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813" }),
                React.createElement("polygon", { fill: "#D87C30", points: "46.125 101.25 92.25 102.375 87.188 126 65.25 120.375" }),
                React.createElement("polygon", { fill: "#EA8D3A", points: "46.125 101.813 65.25 119.813 65.25 137.813" }),
                React.createElement("polygon", { fill: "#F89D35", points: "65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375" }),
                React.createElement("polygon", { fill: "#EB8F35", points: "65.25 138.375 60.75 173.25 90 153" }),
                React.createElement("polygon", { fill: "#EA8E3A", points: "92.25 102.375 95.063 150.188 86.625 125.719" }),
                React.createElement("polygon", { fill: "#D87C30", points: "39.375 138.938 65.25 138.375 60.75 173.25" }),
                React.createElement("polygon", { fill: "#EB8F35", points: "12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75" }),
                React.createElement("polygon", { fill: "#E8821E", points: "88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938" }),
                React.createElement("polygon", { fill: "#393939", points: "70.313 112.5 64.125 125.438 86.063 119.813", transform: "matrix(-1 0 0 1 150.188 0)" }),
                React.createElement("polygon", { fill: "#E88F35", points: "12.375 .563 88.875 58.5 75.938 27" }),
                React.createElement("path", { fill: "#8E5A30", d: "M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z" })))));
};

var ExternalLink = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 24 : _b, _c = _a.height, height = _c === void 0 ? 24 : _c, _d = _a.fill, fill = _d === void 0 ? "none" : _d, _e = _a.stroke, stroke = _e === void 0 ? "currentColor" : _e;
    return (React.createElement("svg", { style: { overflow: "visible" }, xmlns: "http://www.w3.org/2000/svg", width: width, height: height, fill: fill, stroke: stroke, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", className: "feather feather-external-link", viewBox: "0 0 24 24" },
        React.createElement("path", { d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" }),
        React.createElement("path", { d: "M15 3L21 3 21 9" }),
        React.createElement("path", { d: "M10 14L21 3" })));
};

var Close = function (_a) {
    var _b = _a.height, height = _b === void 0 ? 24 : _b, _c = _a.width, width = _c === void 0 ? 24 : _c, _d = _a.fill, fill = _d === void 0 ? "none" : _d, _e = _a.stroke, stroke = _e === void 0 ? "currentColor" : _e;
    return (React.createElement("svg", { style: { overflow: "visible" }, xmlns: "http://www.w3.org/2000/svg", width: width, height: height, fill: fill, stroke: stroke, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", className: "feather feather-x", viewBox: "0 0 24 24" },
        React.createElement("path", { d: "M18 6L6 18" }),
        React.createElement("path", { d: "M6 6L18 18" })));
};

var logos = {
    Metamask: Metamask,
    Eternl: Flint,
    Flint: Flint,
    Nami: Nami
};
var icons = {
    Close: Close,
    ExternalLink: ExternalLink,
};

var StyledButton$1 = styled.button(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  background-color: #E7E7E8;\n  border-width: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  padding: 8px 16px;\n  gap: 10px;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  box-sizing: border-box;\n  color: #0C0E14;\n  font-family: 'Inter', sans-serif;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  background-color: #E7E7E8;\n  border-width: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  padding: 8px 16px;\n  gap: 10px;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  box-sizing: border-box;\n  color: #0C0E14;\n  font-family: 'Inter', sans-serif;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), function (props) {
    return props.isInverted ? "#111" : "#FFF";
});
var Button = function (_a) {
    var iconLeft = _a.iconLeft, iconRight = _a.iconRight, _b = _a.isFullWidth, isFullWidth = _b === void 0 ? false : _b, children = _a.children, style = _a.style, isSmallIcon = _a.isSmallIcon, rest = __rest(_a, ["iconLeft", "iconRight", "isFullWidth", "children", "style", "isSmallIcon"]);
    var Icon = logos[iconLeft] || logos.Nami;
    return (React.createElement(StyledButton$1, __assign({ style: __assign({ width: isFullWidth ? "100%" : undefined }, style) }, rest),
        !!iconLeft &&
            (isSmallIcon ? React.createElement(Icon, { width: 20, height: 20 }) : React.createElement(Icon, null)),
        children,
        !!iconRight && (React.createElement("img", { src: "".concat(iconRight), style: isSmallIcon ? {
                marginRight: "12px",
                width: 20,
                height: 20,
            } : {
                marginRight: "12px",
                width: 32,
                height: 32,
            } }))));
};
var templateObject_1$5;

var StyledModalWrapper = styled.div(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 9999;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  transition: opacity 0.25s ease-out;\n"], ["\n  position: fixed;\n  z-index: 9999;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  transition: opacity 0.25s ease-out;\n"])));
var StyledModal = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  width: 318px;\n  box-sizing: border-box;\n  padding: 24px;\n  background: #12141B;\n  border: 1px solid #1F2129;\n  backdrop-filter: blur(19.5px);\n  border-radius: 12px;\n  position: absolute;\n  top: 90px;\n  right: 70px;\n"], ["\n  width: 318px;\n  box-sizing: border-box;\n  padding: 24px;\n  background: #12141B;\n  border: 1px solid #1F2129;\n  backdrop-filter: blur(19.5px);\n  border-radius: 12px;\n  position: absolute;\n  top: 90px;\n  right: 70px;\n"])));
var StyledHeader = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding-bottom: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"], ["\n  padding-bottom: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"])));
var StyledTitle = styled(Typography)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'Lexend', sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 28px;\n  color: #E7E7E8;\n"], ["\n  font-family: 'Lexend', sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 28px;\n  color: #E7E7E8;\n"])));
var StyledBody = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: strech;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: strech;\n"])));
var Modal = function (_a) {
    var isOpen = _a.isOpen, children = _a.children, title = _a.title, onClose = _a.onClose; _a.isInverted; _a.style; var _c = _a.headerStyle, headerStyle = _c === void 0 ? {} : _c, rest = __rest(_a, ["isOpen", "children", "title", "onClose", "isInverted", "style", "headerStyle"]);
    if (!isOpen) {
        return null;
    }
    return (React.createElement(StyledModalWrapper, __assign({ onClick: onClose }, rest),
        React.createElement(StyledModal, { onClick: function (e) { return e.stopPropagation(); } },
            React.createElement(StyledHeader, { style: headerStyle },
                React.createElement(StyledTitle, null, title)),
            React.createElement(StyledBody, null, children))));
};
var templateObject_1$4, templateObject_2$1, templateObject_3, templateObject_4, templateObject_5;

var StyledButton = styled(Button)(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  height: 64px;\n  border-radius: 8px;\n  background: transparent;\n  color: #626676;\n  font-family: 'Lexend', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 130%;\n  letter-spacing: -0.02em;\n\n  &:hover {\n    background: ", ";\n    color: #E7E7E8;\n  }\n"], ["\n  height: 64px;\n  border-radius: 8px;\n  background: transparent;\n  color: #626676;\n  font-family: 'Lexend', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 130%;\n  letter-spacing: -0.02em;\n\n  &:hover {\n    background: ", ";\n    color: #E7E7E8;\n  }\n"])), function (_a) {
    var activeWalletBgColor = _a.activeWalletBgColor;
    return activeWalletBgColor;
});
var StyledNotInstalledWallet = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: flex-start;\n  gap: 4px;\n  opacity: 0.5;\n  font-size: 14px;\n"], ["\n  display: flex;\n  align-items: flex-start;\n  gap: 4px;\n  opacity: 0.5;\n  font-size: 14px;\n"])));
var ConnectWalletWrapper = function (_a) {
    var activeWalletBgColor = _a.activeWalletBgColor, onClose = _a.onClose;
    var connect = useConnectWallet().connect;
    var supportedWallets = getSupportedWallets();
    var isAWalletInstalled = supportedWallets.find(function (_a) {
        var isInstalled = _a.isInstalled;
        return isInstalled;
    });
    var handleSelectWallet = function (event) { return function (wallet) {
        if (wallet.isInstalled) {
            connect(wallet.id);
        }
        else {
            window.open(wallet.extensionUrl, "_blank", "noreferrer");
        }
        onClose && onClose(event);
    }; };
    return (React.createElement(React.Fragment, null, supportedWallets.length === 0 ? (React.createElement(Typography, { isInverted: true, style: { textAlign: "center" } }, "Cardano wallet extensions are currently only supported in Chrome and Brave browsers.")) : (supportedWallets.map(function (wallet) {
        return (React.createElement("div", { key: wallet.id },
            React.createElement(StyledButton, { iconLeft: wallet.name, onClick: function (event) { return handleSelectWallet(event)(wallet); }, isFullWidth: true, activeWalletBgColor: activeWalletBgColor },
                React.createElement("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"
                    } },
                    wallet.name,
                    !wallet.isInstalled && isAWalletInstalled && (React.createElement(StyledNotInstalledWallet, null,
                        React.createElement(Typography, null, "Not installed"),
                        React.createElement(icons.ExternalLink, { width: 18, height: 18, stroke: "#626676" })))))));
    }))));
};
var templateObject_1$3, templateObject_2;

var ConnectWalletModal = function (_a) {
    var _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.headerStyle, headerStyle = _c === void 0 ? {} : _c, _d = _a.isInverted, isInverted = _d === void 0 ? false : _d, _e = _a.backgroundOpacity, backgroundOpacity = _e === void 0 ? 0.5 : _e, isOpen = _a.isOpen, onClose = _a.onClose;
    var supportedWallets = getSupportedWallets();
    var isAWalletInstalled = supportedWallets.find(function (_a) {
        var isInstalled = _a.isInstalled;
        return isInstalled;
    });
    return (React.createElement(Modal, { isOpen: isOpen, style: style, headerStyle: headerStyle, title: isAWalletInstalled ? "Connect your wallet" : "Install a wallet", onClose: onClose, isInverted: isInverted, backgroundOpacity: backgroundOpacity },
        React.createElement(ConnectWalletWrapper, { activeWalletBgColor: "#191B23", onClose: onClose })));
};

var StyledWalletDiv = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  color: #E7E7E8;\n  font-family: 'Lexend', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 130%;\n  letter-spacing: -0.02em;\n"], ["\n  display: flex;\n  align-items: center;\n  color: #E7E7E8;\n  font-family: 'Lexend', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 130%;\n  letter-spacing: -0.02em;\n"])));
var DisconnectWalletWrapper = function (_a) {
    var _b = _a.disconnectButtonStyle, disconnectButtonStyle = _b === void 0 ? {} : _b, onClose = _a.onClose;
    var _c = useConnectWallet(), wallet = _c.wallet, disconnect = _c.disconnect;
    var handleDisconnect = function (event) {
        disconnect();
        onClose && onClose(event);
    };
    if (!wallet) {
        return null;
    }
    return (React.createElement(StyledWalletDiv, null,
        React.createElement(Typography, null,
            "Connected with ",
            wallet.name,
            "."),
        React.createElement(Button, { onClick: handleDisconnect, style: __assign({ marginLeft: "0.5rem", justifyContent: "center" }, disconnectButtonStyle) }, "Disconnect")));
};
var templateObject_1$2;

var DisconnectWalletModal = function (_a) {
    var isOpen = _a.isOpen, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.headerStyle, headerStyle = _c === void 0 ? {} : _c, _d = _a.isInverted, isInverted = _d === void 0 ? false : _d, _e = _a.backgroundOpacity, backgroundOpacity = _e === void 0 ? 0.5 : _e, onClose = _a.onClose;
    var wallet = useConnectWallet().wallet;
    if (!wallet) {
        return null;
    }
    return (React.createElement(Modal, { isOpen: isOpen, style: style, headerStyle: headerStyle, title: wallet.name, isInverted: isInverted, backgroundOpacity: backgroundOpacity, onClose: onClose },
        React.createElement(DisconnectWalletWrapper, { onClose: onClose })));
};

var WalletModal = function (_a) {
    var style = _a.style, onConnect = _a.onConnect, onError = _a.onError, fontFamily = _a.fontFamily, rest = __rest(_a, ["style", "onConnect", "onError", "fontFamily"]);
    var _b = useConnectWallet(), wallet = _b.wallet, isConnected = _b.isConnected, error = _b.error;
    var prevIsConnected = usePrevious(isConnected);
    var modalStyle = __assign({ fontFamily: fontFamily }, style);
    useEffect(function () {
        if (onConnect && wallet && !prevIsConnected && isConnected) {
            onConnect(wallet);
        }
    }, [isConnected, wallet, prevIsConnected]);
    useEffect(function () {
        if (onError && error) {
            onError(error);
        }
    }, [error]);
    return wallet ? (React.createElement(DisconnectWalletModal, __assign({ style: modalStyle }, rest))) : (React.createElement(ConnectWalletModal, __assign({ style: modalStyle }, rest)));
};

var ConnectWalletButton = function (_a) {
    var _b = _a.style, style = _b === void 0 ? {} : _b, onClick = _a.onClick;
    return (React.createElement(Button, { style: style, onClick: onClick }, "Connect wallet"));
};

var DisconnectWalletButton = function (_a) {
    var style = _a.style, onClick = _a.onClick;
    var wallet = useConnectWallet().wallet;
    if (!wallet)
        return null;
    return (React.createElement(Button, { style: style, iconLeft: wallet.name, onClick: onClick, isSmallIcon: true }, "Disconnect"));
};

var StyledWrapper$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  position: absolute;\n  top: 42px;\n  right: 70px;\n  z-index: 9999;\n"], ["\n  position: absolute;\n  top: 42px;\n  right: 70px;\n  z-index: 9999;\n"])));
var WalletButton = function (_a) {
    var style = _a.style, rest = __rest(_a, ["style"]);
    var wallet = useConnectWallet().wallet;
    var buttonStyle = __assign({}, style);
    return React.createElement(React.Fragment, null, !!wallet ?
        React.createElement(DisconnectWalletButton, __assign({ style: buttonStyle }, rest))
        :
            React.createElement(StyledWrapper$1, null,
                React.createElement(ConnectWalletButton, __assign({ style: buttonStyle }, rest))));
};
var templateObject_1$1;

var ConnectWallet = function (_a) {
    var onClickButton = _a.onClickButton, onCloseModal = _a.onCloseModal, onConnect = _a.onConnect, onError = _a.onError, _b = _a.mainButtonStyle, mainButtonStyle = _b === void 0 ? {} : _b, _c = _a.modalStyle, modalStyle = _c === void 0 ? {} : _c, _d = _a.modalHeaderStyle, modalHeaderStyle = _d === void 0 ? {} : _d, _e = _a.disconnectButtonStyle, disconnectButtonStyle = _e === void 0 ? {} : _e, _f = _a.fontFamily, fontFamily = _f === void 0 ? "" : _f, _g = _a.isInverted, isInverted = _g === void 0 ? false : _g;
    var _h = useState(false), isModalOpen = _h[0], setIsModalOpen = _h[1];
    var _j = useConnectWallet(), wallet = _j.wallet, disconnect = _j.disconnect;
    var handleButtonClick = function (event) {
        if (onClickButton) {
            onClickButton(event);
        }
        else {
            if (!!wallet) {
                disconnect();
            }
            else {
                setIsModalOpen(true);
            }
        }
    };
    var handleCloseModal = function (event) {
        if (onCloseModal) {
            onCloseModal(event);
        }
        else {
            setIsModalOpen(false);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(WalletModal, { isOpen: isModalOpen, style: modalStyle, isInverted: isInverted, headerStyle: modalHeaderStyle, disconnectButtonStyle: disconnectButtonStyle, fontFamily: fontFamily, onConnect: onConnect, onError: onError, onClose: handleCloseModal }),
        React.createElement(WalletButton, { style: mainButtonStyle, onClick: handleButtonClick })));
};

var StyledWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 320px;\n"], ["\n  width: 320px;\n"])));
var WalletWrapper = function (_a) {
    var style = _a.style, onConnect = _a.onConnect, onError = _a.onError, fontFamily = _a.fontFamily, _b = _a.activeWalletBgColor, activeWalletBgColor = _b === void 0 ? "#12141B" : _b, rest = __rest(_a, ["style", "onConnect", "onError", "fontFamily", "activeWalletBgColor"]);
    var _c = useConnectWallet(), wallet = _c.wallet, isConnected = _c.isConnected, error = _c.error;
    var prevIsConnected = usePrevious(isConnected);
    var modalStyle = __assign({ fontFamily: fontFamily }, style);
    useEffect(function () {
        if (onConnect && wallet && !prevIsConnected && isConnected) {
            onConnect(wallet);
        }
    }, [isConnected, wallet, prevIsConnected]);
    useEffect(function () {
        if (onError && error) {
            onError(error);
        }
    }, [error]);
    return React.createElement(StyledWrapper, null, wallet ? (React.createElement(DisconnectWalletWrapper, __assign({ style: modalStyle }, rest))) : (React.createElement(ConnectWalletWrapper, __assign({ style: modalStyle, activeWalletBgColor: activeWalletBgColor }, rest))));
};
var templateObject_1;

export { ConnectWallet, WalletButton, WalletModal, WalletWrapper, disconnectWallet, enableWallet, getSupportedWallets, getWalletAddress, getWalletBalance, getWalletChangeAddress, signWalletTransaction, useConnectWallet };
