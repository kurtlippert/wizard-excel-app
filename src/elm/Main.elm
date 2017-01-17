module Main exposing (..)

import Html exposing (Html, input, div, button, text, h1, br, i)
import Html.Attributes exposing (placeholder, style, type_, classList)
import Html.Events exposing (onInput, onClick)
import Regex exposing (regex)
import Random


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { name : String
    , password : String
    , passwordAgain : String
    , age : String
    , validationMsg : ValidationMsg
    , dieFace : DieFace
    }


init : ( Model, Cmd Msg )
init =
    ( Model "" "" "" "" Empty WorldIcon, Cmd.none )


type ValidationMsg
    = Empty
    | Error String
    | OK


type DieFace
    = WorldIcon
    | MusicIcon
    | GithubIcon
    | HeartIcon
    | ForkIcon
    | CloudIcon



-- UPDATE


type Msg
    = Name String
    | Password String
    | PasswordAgain String
    | Age String
    | Submit
    | Roll
    | NewFace Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Name name ->
            ( { model | name = name }, Cmd.none )

        Password password ->
            ( { model | password = password }, Cmd.none )

        PasswordAgain password ->
            ( { model | passwordAgain = password }, Cmd.none )

        Age age ->
            ( { model | age = age }, Cmd.none )

        Submit ->
            ( { model | validationMsg = validate model }, Cmd.none )

        Roll ->
            ( model, Random.generate NewFace (Random.int 1 6) )

        NewFace newFace ->
            ( { model | dieFace = dieFace newFace }, Cmd.none )


validate : Model -> ValidationMsg
validate model =
    if String.length model.password < 9 then
        Error "Password must be longer than 8 characters"
    else if not (Regex.contains (regex "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$") model.password) then
        Error "Password must be mixed case"
    else if model.password /= model.passwordAgain then
        Error "Passwords do not match!"
    else if Result.withDefault 0 (String.toInt model.age) == 0 then
        Error "Age must be a number > 0"
    else
        OK


dieFace : Int -> DieFace
dieFace newFace =
    case newFace of
        1 ->
            WorldIcon

        2 ->
            MusicIcon

        3 ->
            GithubIcon

        4 ->
            HeartIcon

        5 ->
            ForkIcon

        6 ->
            CloudIcon

        _ ->
            WorldIcon



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div
            [ classList
                [ ( "input", True )
                , ( "ui", True )
                ]
            ]
            [ input [ type_ "text", placeholder "Name", onInput Name ] [] ]
        , div
            [ classList
                [ ( "input", True )
                , ( "ui", True )
                ]
            ]
            [ input [ type_ "password", placeholder "Password", onInput Password ] [] ]
        , div
            [ classList
                [ ( "input", True )
                , ( "ui", True )
                ]
            ]
            [ input [ type_ "password", placeholder "Re-enter Password", onInput PasswordAgain ] [] ]
        , div
            [ classList
                [ ( "input", True )
                , ( "ui", True )
                ]
            ]
            [ input [ type_ "text", placeholder "Age", onInput Age ] [] ]
        , div []
            [ button
                [ classList
                    [ ( "button", True )
                    , ( "ui", True )
                    ]
                , onClick Submit
                ]
                [ text "Submit" ]
            ]
        , viewValidation model
        , br [] []
        , br [] []
        , dieFaceRender model.dieFace
        , div []
            [ button
                [ classList
                    [ ( "button", True )
                    , ( "ui", True )
                    ]
                , onClick Roll
                ]
                [ text "Roll" ]
            ]
        ]


viewValidation : Model -> Html msg
viewValidation model =
    let
        ( color, message ) =
            case model.validationMsg of
                Empty ->
                    ( "", "" )

                Error message ->
                    ( "red", message )

                OK ->
                    ( "green", "OK" )
    in
        div [ style [ ( "color", color ) ] ] [ text message ]


dieFaceRender : DieFace -> Html msg
dieFaceRender dieFace =
    let
        iconType : String
        iconType =
            case dieFace of
                WorldIcon ->
                    "world"

                MusicIcon ->
                    "music"

                GithubIcon ->
                    "github"

                HeartIcon ->
                    "heart"

                ForkIcon ->
                    "fork"

                CloudIcon ->
                    "cloud"
    in
        i [ classList [ ( iconType, True ), ( "icon", True ) ] ] []
