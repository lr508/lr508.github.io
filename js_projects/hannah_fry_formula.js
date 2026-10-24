"use strict"
async function main() {
const data = "https://raw.githubusercontent.com/lr508/lr508.github.io/refs/heads/main/js_projects/celebrity_traitors_s2.csv"
let rows = await d3.csv(data);
let name_list = rows.columns;

let table = {};
for (let name of name_list){
    table[name]=[];
    for (let row of rows){
        row[name].trim() =="" ? table[name].push(null) : table[name].push(row[name]);
    }
}

const total_round_tables = rows.length;

const burn_vote = 0.47;
const banished_traitor_vote = 0.33;
const banished_traitor_never_voted = 0.4;
const banished_traitor_not_vote = -1.28;
const banished_traitor_history = -1.69;

const traitors_dict = {"Maya":0,"Richard":0,"James A":0,"Hannah":1,"Kenny":3};
let name_dict = {};
class contestant {
    constructor(name){
        this.score = 0;
        this.voting_history = [];
        this.active = true;
        this.name = name;
        this.role = false;
        if (Object.hasOwn(traitors_dict, name) && traitors_dict[this.name] === 0) {
                this.role = true;
            }
        }
    };

for (let name of name_list){
    name_dict[name] = new contestant(name);
}

function mostFrequent(arr) {
    let m = {};
    let maxCount = 0;
    let res = null;

    for (let x of arr) {
        m[x] = (m[x] || 0) + 1;

        if (m[x] > maxCount) {
            maxCount = m[x];
            res = x;
        }
    }

    return res;
}

let banished_contestant;

for (let i = 0; i < total_round_tables; i++){
    let round_table_no = i+1;
    let votes = name_list.map(name => table[name][i]).filter(v => v !== null);
    banished_contestant = mostFrequent(votes);
    for (let name of name_list) {
        let player_vote = table[name][i];
    if (player_vote === null || name_dict[name].active == false){
        name_dict[name].active = false;
        continue;
    }
    if (votes.filter(v => v === player_vote).length === 1) {
        name_dict[name].score += burn_vote;
    }
    if (name_dict[banished_contestant].role == true){
        if (player_vote == banished_contestant){
            name_dict[name].score += banished_traitor_vote;
            if (name_dict[name].voting_history.includes(banished_contestant) === false){
                    name_dict[name].score += banished_traitor_never_voted;
                }
            } else if (player_vote != banished_contestant && name != banished_contestant){
                name_dict[name].score += banished_traitor_not_vote;
            }
    }
        name_dict[name].voting_history.push(player_vote);
    }
    if (name_dict[banished_contestant].role == true){
        for (let voted_name of name_dict[banished_contestant].voting_history){
            if (name_dict[voted_name].active == true){
                name_dict[voted_name].score += banished_traitor_history;
            }
        }
    }

    for (let name of name_list){
        if (Object.hasOwn(traitors_dict, name) && traitors_dict[name] === i) {
                name_dict[name].role = true;
            }
    
    }
    name_dict[banished_contestant].active = false;
}

let plot_dict = {"name":[],"score":[],"role":[],"colour":[]};
for (let name of name_list){
    if (name_dict[name].active == true || banished_contestant == name){
        plot_dict["name"].push(name);
        plot_dict["score"].push(name_dict[name].score);
        let role = "";
        if (banished_contestant == name){
            role+= "Banished ";
        }
        if (name_dict[name].role){
            role+= "Traitor";
        }
        else{
            role+= "Faithful";
        }
        plot_dict["role"].push(role);
    }
}

let roles =  plot_dict.role;

const colorMap = roles.includes("Banished Faithful")
    ? { "Traitor": "#d62728", "Faithful": "#1f77b4", "Banished Faithful": "#8ec2e7" }
    : { "Traitor": "#d62728", "Faithful": "#1f77b4", "Banished Traitor": "#d86060" };





const traces = [...new Set(roles)].map(role => {
    const idx = roles.flatMap((r, i) => (r === role ? [i] : []));
    return {
        type: "bar",
        name: role,
        x: idx.map(i => plot_dict.name[i]),
        y: idx.map(i => plot_dict.score[i]),
        marker: { color: colorMap[role] },
    };
});

const layout = {
    title: { text: "Traitor Score By Player after Roundtable ${total_round_tables}" },
    xaxis: { title: { text: "name" }, categoryorder: "total ascending" },
    yaxis: { title: { text: "score" } },
};

Plotly.newPlot("myDiv", traces, layout);
}
main();
