# Calculator & Money Converter Web App

A single-page application built with HTML, CSS (Bootstrap), and vanilla JavaScript.
It includes two modules displayed side-by-side:

# Calculator
A fully functional calculator with:
- Basic arithmetic operations (+, -, *, ÷)
- Decimal support
- Percentage calculation
- Sign toggle (+/-)
- Calculation history stored in `localStorage`
- Clean architecture using **State -> Controllers -> Model -> View**

# Money Converter
A currency converter using static currency rates with:
- Amount/From/To selectors
- Swap currencies instantly
- Live rate preview ( 1 EUR = X USD)
- Organized in **State -> Controllers -> Model -> View** format
- Identical UI styling with calculator (Bootstrap-based)

# History
The application includes a **History page** where all calculator operations are stored automatically.  
Each saved entry contains:
- Full expression (e.g. `5 × 7 =`)
- Result
- Timestamp in ISO format
- Stored persistently in the browser's `localStorage`

History features:
- Automatically appends new entries  
- Persists after page reload  
- Displays results in an organized list  
- Can be cleared locally without affecting the calculator functionality

# Architecture
Both modules follow an MVC-like structure:
- **State**: Holds current values
- **Controllers**: Event handling
- **Model**: Logic & calculations
- **View**: DOM updates

# Tech Stack
- HTML5
- CSS3 + Bootstrap 5
- Vanilla JavaScript
- LocalStorage API

# Features
- Responsive layout
- Single-page design (SPA-style)
- No external JS libraries
- Clean code, modular logic, and maintainable structure
