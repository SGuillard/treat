<?php

namespace App\Utils;

class ImportImdbConst
{
    public const RATING_CLASS = 'PersistRating';
    public const RATING_FILE = 'ratings.tsv';
    public const BASIC_CLASS = 'PersistBasic';
    public const BASIC_FILE = 'basics.tsv';


    public static function getImportRatingClass(): string
    {
        return self::RATING_CLASS;
    }

    public static function getImportBasicClass(): string
    {
        return self::BASIC_CLASS;
    }

    public static function getRatingFile(): string
    {
        return self::RATING_FILE;
    }

    public static function getBasicFile(): string
    {
        return self::BASIC_FILE;
    }
}
