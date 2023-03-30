# MODEL SYSTEMU DO BADANIA EFEKTYWNOŚCI ANIMACJI WEBOWYCH - MODEL OF SYSTEM FOR TESTING THE EFFECTIVENESS OF WEB ANIMATIONS

# Określenie celów badania

Celem pracy jest opracowanie modelu systemu do badania efektywności animacji webowych pod kątem absorpcji uwagi użytkowników oraz zbadanie z udziałem eye trackera skuteczności animacji realizowanych w różnych technologiach. Podczas budowy prototypu aplikacji webowej jako metody animacji dwuwymiarowej oraz trójwymiarowej porównuje ze sobą rozwiązanie natywne CSS Animations z biblioteką Three.js.

Najskuteczniejsze rodzaje animacji zależą od kontekstu, w jakim są używane i od celu, jaki ma być osiągnięty. Oto kilka rodzajów animacji, które użyłam przy budowie modelu:

## Animacja wyświetlania treści

Animacja używana do wyświetlania nowych treści na stronie internetowej. Może to pomóc użytkownikom zauważyć, że coś się zmieniło i zachęcić ich do interakcji z nową treścią.

## Animacja podkreślenia

Animacja, która podkreśla określony element na stronie internetowej, na przykład zdjęcie lub nagłówek. Może to pomóc w skupieniu uwagi użytkowników na ważnych elementach strony i zwiększyć ich zaangażowanie.

## Animacje kierunkowe

Animacje, które przyciągają uwagę użytkownika poprzez kierowanie go w określonym kierunku, na przykład animacje strzałek, które wskazują na inny element na stronie.

# Wybór odpowiednich miar i wskaźników.

Głównym celem badanie jest reakcja, skupienie użytkownika oraz przyciągnięcie uwagi badanej osoby poprzez szybkość oraz kierunek animacji zawartej w określonej sekcji aplikacji webowej.
Głównymi wskaźnikami, które mierzą efektywność animacji, są:

## Czas ładowania strony

Animacje, które powodują zbyt długi czas ładowania strony, mogą negatywnie wpłynąć na doświadczenie użytkownika. Dlatego ważne jest, aby pamiętać o optymalizacji animacji pod kątem szybkości ładowania strony.

## Częstotliwość użycia

Zbyt częste użycie animacji na stronie internetowej może powodować, że użytkownik stanie się niewrażliwy na ich efekt, a nawet może to wpłynąć na negatywnie na korzystanie z serwisu. Dlatego ważne jest, aby umiejętnie dobierać rodzaj i częstotliwość animacji na stronie.

## Konwersja

Animacje, które pomagają przyciągnąć uwagę użytkownika na określony element lub zachęcają go do wykonania określonej akcji. Mogą pozytywnie wpłynąć na konwersję i sprzedaż.

## Zaangażowanie użytkownika

Animacje, które są estetycznie wykonane i odpowiednio dopasowane do treści na stronie internetowej, mogą pomóc zwiększyć zaangażowanie użytkowników i zachęcić ich do dalszego korzystania z serwisu.

# Określenie warunków testowych

Grupą docelową użytkowników badania są chętni studenci, w przedziale wiekowym. Analizując określone obiekty, przez które są budowane animacja, podstawowymi figurami geometrycznymi są kwadra, trójkąt, koło. Musiałam początkowo wybrać odopwiedni testowany obiekt, którym jest koło, ponieważ jest przypomina punkt kierujący największą uwagę użytkownika.
Następnie wybrałam odpowiednie rodzaje animacji,które badają ruch danego obiektu na stronie.

# Przygotowanie zestawu danych

Przygotowanie zestawu danych to ważny krok w budowie modelu.
Opracowałam zestaw animacji, które będą testowane oraz zestaw kontroli, w których nie będzie animacji. Dzięki temu można porównać efektywność animacji z brakiem animacji.
Dane, które są istotne przy budowie wskazanej animacji to ruch. Model składa się z galerii obrazków. Każdy z nich w pojedynczych kartach, losowo wyświetla obiekty z animacją wskazującą ruch liniowy, bądź losowy.

# Przeprowadzenie badań

Następnie z pomocą eye trackera dokonałam porównania wydajności oraz optymalnych rozwiązań dla poszczególnych kart oraz animacji wskazanych modeli.

# Analiza wyników

Po zakończeniu badania dokładnie przeanalizowałam wyniki.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-ts-1dq1it)
