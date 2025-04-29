export default function Breakpoints() {
    return (
        <div class="fixed top-10 left-0 w-fit flex justify-between p-2 z-[999]">
            <div class="bg-red-500 text-white px-4 py-2 block sm:hidden">XS</div>
            <div class="bg-blue-500 text-white px-4 py-2 hidden sm:block md:hidden">SM</div>
            <div class="bg-green-500 text-white px-4 py-2 hidden md:block rg:hidden">MD</div>
            <div class="bg-yellow-500 text-white px-4 py-2 hidden rg:block rl:hidden">RG</div>
            <div class="bg-purple-500 text-white px-4 py-2 hidden rl:block lg:hidden">RL</div>
            <div class="bg-pink-500 text-white px-4 py-2 hidden lg:block xl:hidden">LG</div>
            <div class="bg-indigo-500 text-white px-4 py-2 hidden xl:block xxl:hidden">XL</div>
            <div class="bg-teal-500 text-white px-4 py-2 hidden xxl:block 2xl:hidden">XXL</div>
            <div class="bg-orange-500 text-white px-4 py-2 hidden 2xl:block">2XL</div>
        </div>

    );
}
