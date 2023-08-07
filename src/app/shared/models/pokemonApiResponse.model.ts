//interfaces for pokemon list api call

export interface PokemonApiResponse {
    results: PokemonResult[];
}

export interface PokemonResult {
    name: string;
    url: string;
}

//interfaces for pokemon description api call

export interface PokemonDescription {
    description: string;
}

interface FlavorTextEntry {
    flavor_text: string;
    language: {
        name: string;
    };
}

export interface PokemonDescriptionApiResponse {
    flavor_text_entries: FlavorTextEntry[];
}