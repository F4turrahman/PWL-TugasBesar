
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className='text-center p-3 text-white' style={{ background: '#0051b9' }}>
            &copy; {currentYear} | BagGo
        </div>
    );
}
