import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@repo/ui';
import { formatDate } from '@repo/shared';
function App() {
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4", children: _jsxs("div", { className: "max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Monorepo Template" }), _jsxs("p", { className: "text-gray-600 mb-8", children: ["Welcome to your new production-ready monorepo. Today is", ' ', formatDate(new Date()), "."] }), _jsxs("div", { className: "flex gap-4 justify-center", children: [_jsx(Button, { onClick: () => alert('Clicked!'), children: "Primary Button" }), _jsx(Button, { variant: "secondary", onClick: () => alert('Secondary Clicked!'), children: "Secondary Button" })] })] }) }));
}
export default App;
