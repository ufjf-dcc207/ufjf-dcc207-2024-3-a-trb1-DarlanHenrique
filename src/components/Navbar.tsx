import { useState, useEffect } from 'react';
import "../css/Navbar.css";
import logo from '../assets/logo/Net_Prime_Plus_Max_Flix.png';
import SearchFilter from './SearchFilter';

interface NavbarProps {
    types: string[];
    genres: string[];
    streamServices: string[];
    onGenreSelect: (genre: string | null) => void;
    onTypeSelect: (type: string | null) => void;
    onStreamServiceSelect: (streamService: string | null) => void;
    onSearch: (filters: {
        search: string;
        genres: string[];
        type: string | null;
        streamService: string | null;
    }) => void;
}

export default function Navbar({ types, genres, streamServices, onGenreSelect, onTypeSelect, onStreamServiceSelect, onSearch,}: NavbarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 96);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top mt-2 ${isScrolled ? 'navbar-light bg-light' : ''}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img className="logo" src={logo} alt="Net Prime Plus Max Flix" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className={`btn me-2 ${isScrolled ? 'btn-outline-dark' : 'btn-outline-light'}`}
                                aria-current="page"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onGenreSelect(null);
                                    onTypeSelect(null);
                                    onStreamServiceSelect(null);
                                    onSearch({
                                        search: "",
                                        genres: [],
                                        type: null,
                                        streamService: null,
                                    });
                                }}
                            >
                                Início
                            </a>
                        </li>
                        {types.map((type) => (
                            <li key={type} className="nav-item">
                                <a
                                    className={`btn me-2 text-capitalize ${isScrolled ? 'btn-outline-dark' : 'btn-outline-light'}`}
                                    href={`#${type}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onTypeSelect(type);
                                    }}
                                >
                                    {type}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item dropdown">
                            <a
                                className={`btn me-2 ${isScrolled ? 'btn-outline-dark' : 'btn-outline-light'}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categorias
                            </a>
                            <ul className="dropdown-menu">
                                {genres.map((genre) => (
                                    <li key={genre}>
                                        <a
                                            className="dropdown-item text-capitalize"
                                            href={`#${genre}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onGenreSelect(genre);
                                            }}
                                        >
                                            {genre}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className={`btn ${isScrolled ? 'btn-outline-dark' : 'btn-outline-light'}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Streaming
                            </a>
                            <ul className="dropdown-menu">
                                {streamServices.map((streamService) => (
                                    <li key={streamService}>
                                        <a
                                            className="dropdown-item text-capitalize"
                                            href={`#${streamService}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onStreamServiceSelect(streamService);
                                            }}
                                        >
                                            {streamService}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <button className="btn" onClick={handleModalOpen}>🔎</button>
                    </div>
                    {isModalOpen && (
                        <SearchFilter
                            onClose={handleModalClose}
                            types={types}
                            genres={genres}
                            streamServices={streamServices}
                            onSearch={onSearch}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
}