
export type MovieType = {
    id: number
    poster_path: string
    backdrop_path: string
    title: string
    original_title: string
    overview: string
    name: string
}

export type TvShowsType = {
    id: number
    poster_path: string
    name: string
    original_name: string
}

export type CastCrewType = {
    profile_path: string
    name: string
    character: string
    known_for_department: string
}

export type SeasonType = {
    poster_path: string
    name: string
    air_date: string
    episode_count: number

}


// Component Props

//movies
export type TopInfoMovieProps = {
    data: {
        poster_path: string
        backdrop_path: string
        title: string
        original_title: string
        overview: string
        tagline: string
    }
}

export type MovieInformationProps = {
    data: {
        status: string
        original_language: string
        vote_average: string
        genres: {
            name: string
        }[]
        spoken_languages: {
            english_name: string
        }[]
    }
    isLoadingMovieDetails: boolean
}

export type CastsCrewsProps = {
    cast: CastCrewType[]
    crew: {
        profile_path: string
        name: string
        character: string
        known_for_department: string
    }[]
    isLoadingCast: boolean
}

export type TrailerProps = {
    videoResults: {
        type: string
        key: string
    }[]
  }



//tv shows
export type TopInfoTvShowProps = {
    data: {
        backdrop_path: string
        poster_path: string
        tagline: string
        overview: string
        name: string
    }
    setTvShowTitle: React.Dispatch<React.SetStateAction<string>>
}

export type SeasonProps = {
    seasons: SeasonType[]
    tvShowTitle: string
    isLoadingMovieDetails: boolean
}

