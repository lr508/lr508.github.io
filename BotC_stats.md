# Blood On The Clocktower (BotC) Data Visualisation

Blood On The Clocktower is a social deduction game that I've played quite a few games of. I've been keeping track of the games I've played, and I thought that a good exercise in data visualisation would be to create a report of this data in Microsoft Power BI.

The data used (accurate as of 11/08/2025) can be viewed in the table below:

<details>
<summary><strong>BotC Games</strong></summary>

|   Game Number | Date       | Type        | Script                           | Alignment   | Character            | Outcome   |   Win % |
|--------------:|:-----------|:------------|:---------------------------------|:------------|:---------------------|:----------|--------:|
|             1 | 26/06/2024 | Normal      | Trouble Brewing                  | Good        | Chef                 | Loss      |  0      |
|             2 | 26/06/2024 | Normal      | Trouble Brewing                  | Good        | Mayor                | Loss      |  0      |
|             3 | 01/07/2024 | Normal      | My Beloved Monster               | Good        | Balloonist           | Loss      |  0      |
|             4 | 01/07/2024 | Normal      | Land Of The Midnight Sun         | Good        | Clockmaker           | Win       | 25      |
|             5 | 01/07/2024 | Teensyville | Race To The Bottom               | Evil        | Vortox               | Loss      | 20      |
|             6 | 17/07/2024 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Win       | 33.3333 |
|             7 | 17/07/2024 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Win       | 42.8571 |
|             8 | 24/07/2024 | Normal      | Trouble Brewing                  | Good        | Saint                | Win       | 50      |
|             9 | 24/07/2024 | Normal      | Trouble Brewing                  | Evil        | Spy                  | Win       | 55.5556 |
|            10 | 31/07/2024 | Normal      | Bad Moon Rising                  | Evil        | Godfather            | Loss      | 50      |
|            11 | 31/07/2024 | Normal      | Sects & Violets                  | Good        | Mathematician        | Win       | 54.5455 |
|            12 | 17/08/2024 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Win       | 58.3333 |
|            13 | 24/08/2024 | Normal      | A Perfect Place                  | Evil        | Cerenovus            | Loss      | 53.8462 |
|            14 | 30/08/2024 | Normal      | Back To School                   | Good        | Librarian            | Win       | 57.1429 |
|            15 | 30/08/2024 | Normal      | (You Will Never) Break The Chain | Good        | Sailor               | Win       | 60      |
|            16 | 31/08/2024 | Normal      | Trouble Brewing                  | Good        | Recluse              | Loss      | 56.25   |
|            17 | 31/08/2024 | Normal      | Sects & Violets                  | Evil        | Cerenovus            | Win       | 58.8235 |
|            18 | 04/09/2024 | Normal      | Bad Moon Rising                  | Good        | Pacifist             | Loss      | 55.5556 |
|            19 | 04/09/2024 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Win       | 57.8947 |
|            20 | 07/09/2024 | Normal      | Sects & Violets                  | Good        | Philosopher (Savant) | Win       | 60      |
|            21 | 07/09/2024 | Normal      | Trouble Brewing                  | Good        | Monk                 | Loss      | 57.1429 |
|            22 | 07/09/2024 | Normal      | Trouble Brewing                  | Good        | Chef                 | Win       | 59.0909 |
|            23 | 07/09/2024 | Normal      | Trouble Brewing                  | Good        | Recluse              | Loss      | 56.5217 |
|            24 | 07/09/2024 | Normal      | Smoked Onions                    | Good        | Noble (Drunk)        | Win       | 58.3333 |
|            25 | 14/09/2024 | Normal      | Sects & Violets                  | Good        | Dreamer              | Loss      | 56      |
|            26 | 14/09/2024 | Normal      | Trouble Brewing                  | Good        | Mayor                | Loss      | 53.8462 |
|            27 | 21/09/2024 | Normal      | Sects & Violets                  | Good        | Town Crier           | Loss      | 51.8519 |
|            28 | 21/09/2024 | Normal      | Bad Moon Rising                  | Good        | Exorcist             | Loss      | 50      |
|            29 | 21/09/2024 | Normal      | Trouble Brewing                  | Good        | Washerwoman          | Loss      | 48.2759 |
|            30 | 21/09/2024 | Normal      | Trouble Brewing                  | Good        | Investigator         | Win       | 50      |
|            31 | 27/09/2024 | Normal      | Dark and Stormy-caught           | Good        | Noble                | Win       | 51.6129 |
|            32 | 27/09/2024 | Normal      | Malchemy                         | Evil        | Imp                  | Loss      | 50      |
|            33 | 27/09/2024 | Normal      | Malchemy                         | Evil        | Fang Gu              | Win       | 51.5152 |
|            34 | 27/09/2024 | Normal      | Induced Labour                   | Good        | Shugenja             | Loss      | 50      |
|            35 | 28/09/2024 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Win       | 51.4286 |
|            36 | 28/09/2024 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Loss      | 50      |
|            37 | 28/09/2024 | Normal      | Sects & Violets                  | Good        | Artist               | Win       | 51.3514 |
|            38 | 29/05/2025 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Win       | 52.6316 |
|            39 | 29/05/2025 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Loss      | 51.2821 |
|            40 | 29/05/2025 | Normal      | Trouble Brewing                  | Evil        | Poisoner             | Loss      | 50      |
|            41 | 18/06/2025 | Normal      | Trouble Brewing                  | Good        | Ravenkeeper          | Loss      | 48.7805 |
|            42 | 18/06/2025 | Normal      | Trouble Brewing                  | Good        | Soldier              | Loss      | 47.619  |
|            43 | 26/06/2025 | Normal      | Trouble Brewing                  | Evil        | Imp                  | Loss      | 46.5116 |
|            44 | 26/06/2025 | Normal      | Trouble Brewing                  | Evil        | Spy                  | Win       | 47.7273 |
|            45 | 26/06/2025 | Normal      | Trouble Brewing                  | Good        | Recluse              | Win       | 48.8889 |
|            46 | 06/08/2025 | Normal      | Sects & Violets                  | Good        | Sweetheart           | Loss      | 47.8261 |
|            47 | 06/08/2025 | Normal      | Sects & Violets                  | Good        | Barber               | Loss      | 46.8085 |
|            48 | 06/08/2025 | Normal      | Sects & Violets                  | Good        | Flower Girl          | Win       | 47.9167 |


</details>


An image of the report can be seen below:

![BotC Graphs](images/project_3/BotC_stats.png)

From this, we can see that my win percentage peaked at game 15, with a 60 % win rate, before decreasing after a string of losses to hover at around 45-50 %. Just over 25 % (6/23) of my wins have come as the imp, with a win rate of 56 % as evil and 43 % as good.
