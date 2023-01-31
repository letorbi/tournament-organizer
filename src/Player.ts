import { PlayerValues } from './interfaces/PlayerValues.js';
import { SettablePlayerValues } from './interfaces/SettablePlayerValues.js';

/** Class representing a player */
export class Player {
    /** Unique ID of the player */
    id: PlayerValues['id'];

    /** Name of the player */
    name: PlayerValues['name'];

    /** If the player is active */
    active: PlayerValues['active'];

    /** Numerical value for player, such as rating or seed */
    value: PlayerValues['value'];

    /** Array of matches the player is in */
    matches: PlayerValues['matches'];

    /** Create a new player */
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.active = true;
        this.value = 0;
        this.matches = [];
    }

    /** Set information about the player (only changes in information need to be included in the object) */
    set values(options: SettablePlayerValues) {
        if (options.hasOwnProperty('matches')) {
            options.matches = [...this.matches, ...options.matches];
        }
        Object.assign(this, options);
    }

    /** Add a new match for the player */
    addMatch(match: {
        id: string,
        opponent: string | null,
        pairUpDown?: boolean,
        color?: 'w' | 'b' | null,
        bye?: boolean,
        win?: number,
        loss?: number,
        draw?: number
    }): void {
        if (this.matches.find(m => m.id === match.id) !== undefined) {
            throw `Match with ID ${match.id} already exists`;
        }
        const newMatch = Object.assign({
            pairUpDown: false,
            color: null,
            bye: false,
            win: 0,
            loss: 0,
            draw: 0
        }, match);
        this.matches.push(newMatch);
    }

    /** Remove a match from player history */
    removeMatch(id: string): void {
        const index = this.matches.findIndex(m => m.id === id);
        if (index === -1) {
            throw `Match with ID ${id} does not exist`;
        }
        this.matches.splice(index, 1);
    }

    /** Update the details of a match for a player */
    updateMatch(id: string, values: {
        opponent?: string | null,
        pairUpDown?: boolean,
        color?: 'w' | 'b' | null,
        bye?: boolean,
        win?: number,
        loss?: number,
        draw?: number
    }): void {
        const match = this.matches.find(m => m.id === id);
        if (match === undefined) {
            throw `Match with ID ${id} does not exist`;
        }
        Object.assign(match, values);
    }
}