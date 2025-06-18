@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (trim($slot) === 'Col&MacArthur - Maintenance')
                <img src="{{ asset('img/logo.svg') }}" class="logo" alt="Col&MacArthur - Maintenance Logo"
                    style="height: 50px;">
            @else
                {{ $slot }}
            @endif
        </a>
    </td>
</tr>